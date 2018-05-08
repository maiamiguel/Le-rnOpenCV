#!/usr/bin/python
# coding= utf-8

# Form based authentication for CherryPy. 

import cherrypy
import sqlite3
import os
from os import listdir
from os.path import isfile, join

SESSION_KEY = '_cp_username'

def check_credentials(username, password):
    """Verifies credentials for username and password.
    Returns None on success or a string describing the error on failure"""

    con = sqlite3.connect('users.db')
    cur = con.cursor()
    cur.execute('''SELECT username, password FROM users WHERE username LIKE ?''',(username,))
    info = cur.fetchall()
    print info

    if info == []:
        return u"Incorrect username or password."
    print "userprovided: "+ str(username)+" pwd: "+str(password)
    print "user: "+ str(info[0][0])+" pwd: "+str(info[0][1])

    if str(info[0][0]) == str(username) and str(info[0][1]) == str(password):
        print "SUCESS SUCESS SUCESS SUCESS SUCESS"
        return None
    else:
        print "FAIL FAIL FAIL FAIL FAIL"
        return u"Incorrect username or password."
    
    # An example implementation which uses an ORM could be:
    # u = User.get(username)
    # if u is None:
    #     return u"Username %s is unknown to me." % username
    # if u.password != md5.new(password).hexdigest():
    #     return u"Incorrect password"

def check_auth(*args, **kwargs):
    """A tool that looks in config for 'auth.require'. If found and it
    is not None, a login is required and the entry is evaluated as a list of
    conditions that the user must fulfill"""
    conditions = cherrypy.request.config.get('auth.require', None)
    if conditions is not None:
        username = cherrypy.session.get(SESSION_KEY)
        if username:
            cherrypy.request.login = username
            for condition in conditions:
                # A condition is just a callable that returns true or false
                if not condition():
                    raise cherrypy.HTTPRedirect("/auth/login")
        else:
            raise cherrypy.HTTPRedirect("/auth/login")
    
cherrypy.tools.auth = cherrypy.Tool('before_handler', check_auth)

def require(*conditions):
    """A decorator that appends conditions to the auth.require config
    variable."""
    def decorate(f):
        if not hasattr(f, '_cp_config'):
            f._cp_config = dict()
        if 'auth.require' not in f._cp_config:
            f._cp_config['auth.require'] = []
        f._cp_config['auth.require'].extend(conditions)
        return f
    return decorate


# Conditions are callables that return True
# if the user fulfills the conditions they define, False otherwise
#
# They can access the current username as cherrypy.request.login
#
# Define those at will however suits the application.

def member_of(groupname):
    def check():
        username = cherrypy.request.login
        con = sqlite3.connect('users.db')
        cur = con.cursor()
        cur.execute('''SELECT groupname  FROM users WHERE username LIKE ?''',(username,))
        info = cur.fetchall()
        print info[0]    
        if info == []:
            return False 
        return groupname == str(info[0][0])
    return check

def name_is(reqd_username):
    return lambda: reqd_username == cherrypy.request.login

# These might be handy

def any_of(*conditions):
    """Returns True if any of the conditions match"""
    def check():
        for c in conditions:
            if c():
                return True
        return False
    return check

# By default all conditions are required, but this might still be
# needed if you want to use it inside of an any_of(...) condition
def all_of(*conditions):
    """Returns True if all of the conditions match"""
    def check():
        for c in conditions:
            if not c():
                return False
        return True
    return check


# Controller to provide login and logout actions

class AuthController(object):
    
    @cherrypy.expose
    def login(self, username=None, password=None, from_page="/login"):
        
        if username == None and password == None:
            raise cherrypy.HTTPRedirect("/index")

        error_msg = check_credentials(username, password)
        if error_msg:
            print "return self.get_loginform(username, error_msg, from_page)"
            raise cherrypy.HTTPRedirect("/login")
        else:
            cherrypy.session[SESSION_KEY] = cherrypy.request.login = username
            raise cherrypy.HTTPRedirect("/api")
    
    @cherrypy.expose
    def logout(self):
        sess = cherrypy.session
        username = sess.get(SESSION_KEY, None)
        sess[SESSION_KEY] = None
        if username:
            cherrypy.request.login = None

        current_dir = os.path.dirname(os.path.abspath(__file__))            
        directory = current_dir +"/app/uploads"

        onlyfiles = [f for f in listdir(directory) if isfile(join(directory, f))]

        print "\n!!!!!!!!!!!!!!!!!!\tCLEANING UPLOAD FOLDER\t!!!!!!!!!!!!!!!!!!\n"
        
        for f in onlyfiles:

            destination = os.path.join(directory, f)
            os.remove(destination)
        raise cherrypy.HTTPRedirect("/login")
