#!/usr/bin/python
# coding= utf-8

# Server
# Developed for Python 2.x


import os, os.path
import cherrypy
import sys
import json
import socket
import urllib2
import shutil
import cgi
import tempfile
import re
#import netifaces as ni
import time
from openCV_effects import createEffect
from scriptParser import scriptParser, scriptCreator
from auth import AuthController, require, member_of, name_is
import sqlite3
import glob

#Database creation
#con = sqlite3.connect('users.db')
#Conection to database file and search object construction
#cur = con.cursor() 
#cria tabela com informação de nome e pauta da música (se não existir)
with sqlite3.connect('users.db') as cur:
    #Tabel creation if it does not exist
    cur.execute('''CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, firstname TEXT, lastname TEXT, password TEXT, email TEXT, groupname TEXT)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS images (img_id INTEGER PRIMARY KEY AUTOINCREMENT, filename TEXT, script TEXT, filelocation TEXT, user TEXT, script_location TEXT, timest DATETIME DEFAULT CURRENT_TIMESTAMP)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS effects (effect_id INTEGER PRIMARY KEY AUTOINCREMENT, effect_name TEXT, effect_filelocation)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS customScripts (script_id INTEGER PRIMARY KEY AUTOINCREMENT, custom_name TEXT, effects TEXT, user TEXT)''')
    cur.execute('''CREATE TABLE IF NOT EXISTS addedFunctions (func_id INTEGER PRIMARY KEY AUTOINCREMENT, func_name TEXT, numberofargs INTEGER, functionfilelocation TEXT, user TEXT)''')

class Root(object):
    script = ""


    _cp_config = {
        'tools.sessions.on': True,
        'tools.auth.on': True
    }

    auth = AuthController()
    
    @cherrypy.expose
    #devolve a página incial
    def index(self):
        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/index.html','r').read()

    @cherrypy.expose
    def login(self):        
        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/login.html','r').read()
    
    @cherrypy.expose
    def register(self):    
        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/register.html','r').read()
    
    @cherrypy.expose
    def createUser(self, firstname_input, lastname_input, username_input, email_input, pwd_input):
        username = username_input
        firstname = firstname_input
        lastname = lastname_input
        password = pwd_input
        email = email_input
        print "username: "+ username+" , password: "+ password+ " , email: "+email
        
        with sqlite3.connect('users.db') as cur:
            cur.execute('''INSERT INTO users (username, firstname, lastname, password, email, groupname) VALUES (?,?,?,?,?,?)''',(username, firstname, lastname, password, email, 'user'))


        current_dir = os.path.dirname(os.path.abspath(__file__))
        directory = current_dir +"/app/uploads/"+str(username)
        if not os.path.exists(directory):
            os.makedirs(directory)
        raise cherrypy.HTTPRedirect("/login")
        
    @cherrypy.expose
    @require(member_of("user"))
    def changeUser(self, newusername):
        username = cherrypy.request.login

        with sqlite3.connect('users.db') as cur:
            cur.execute('''UPDATE users SET username = ? WHERE username LIKE ?''',(newusername, username,))
        return       

    @cherrypy.expose
    @require(member_of("user"))
    def api(self):

        effects_ins = [("BGR2GRAY","opencvfunction/BGR2GRAY"),
                    ("canny","opencvfunction/canny"),
                    ("BGR2HSV","opencvfunction/BGR2HSV"),
                    ("BGR2HLS", "opencvfunction/BGR2HLS"),
                    ("faceeyedetect","opencvfunction/faceeyedetect"),
                    ("eyedetect","opencvfunction/eyedetect"),
                    ("facedetect","opencvfunction/facedetect"),
                    ("blur", "opencvfunction/blur"),
                    ("opening","opencvfunction/opening"),
                    ("gradient","opencvfunction/gradient"),
                    ("tophat","opencvfunction/tophat"),
                    ("blackhat","opencvfunction/blackhat"),
                    ("closing","opencvfunction/closing"),
                    ("erode","opencvfunction/erode"),
                    ("dilate","opencvfunction/dilate"),
                    ("simplethresholding","opencvfunction/simplethresholding"),
                    ("adaptivethresholding","opencvfunction/adaptivethresholding"),
                    ("medianblur","opencvfunction/medianblur"),
                    ("gaussianblur","opencvfunction/gaussianblur"),
                    ("resize","opencvfunction/resize")]

        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT * FROM effects''')
            exist = c.fetchone()
            if exist is None:
                print "ADDING ELEMENTS TO DB"
                cur.executemany('''INSERT INTO effects(effect_name,effect_filelocation) VALUES (?, ?)''', effects_ins)

        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/api.html','r').read()
 
    @cherrypy.expose
    @require(member_of("user"))
    def info(self):
        username = cherrypy.request.login
        info=[]
        
        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT firstname, lastname FROM users WHERE username LIKE ?''',(username,))
            info = c.fetchall()
        
        returnjson = '{"firstname" : "'+str(info[0][0])+'", "lastname" : "'+str(info[0][1])+'"}'
        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage)


    @cherrypy.expose
    @require(member_of("user"))
    def getScriptCode(self, effect_name):
        info=[]
        
        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT effect_filelocation FROM effects WHERE effect_name LIKE ?''',(effect_name,))
            info = c.fetchall()
        
        print info[0][0]
        with open(info[0][0]) as fout:
            contents = json.load(fout)
        print contents
        
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(contents)
        


    @cherrypy.expose
    @require(member_of("user"))
    def account(self):    
        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/account_info.html','r').read()

    @cherrypy.expose
    @require(member_of("user"))
    def histPage(self):    
        cherrypy.response.headers['Content-Type'] = 'text/html'
        return open('app/image_history.html','r').read()

    @cherrypy.expose
    @require(member_of("user"))
    def accountinfo(self):
        username = cherrypy.request.login
        info=[]

        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT email FROM users WHERE username LIKE ?''',(username,))
            info = c.fetchall()

        returnjson = '{"email" : "'+str(info[0][0])+'", "username" : "'+str(username)+'"}'
        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage) 


    @require(member_of("user"))
    @cherrypy.expose
    def getHistory(self):
        username = cherrypy.request.login
        infolist=[]

        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT filelocation, script, script_location, timest FROM images WHERE user LIKE ?''',(username,))
            infolist = c.fetchall()

        returnjson =  '['
        for info in infolist:
            returnjson += '{"filelocation" : "'+str(info[0])+'", "script" : '+str(info[1])+', "script_location" : "'+str(info[2])+'", "timestamp" : "'+str(info[3])+'"},'

        returnjson=returnjson[:-1]
        returnjson+=']'
        print returnjson        

        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage)         


    @require(member_of("user"))
    @cherrypy.expose
    def saveToHistory(self):
        username = cherrypy.request.login
        filename = os.path.basename(cherrypy.request.headers['x-filename'])

        info1 = cherrypy.request.headers['info']
        info = json.loads(info1)


        directory = os.path.dirname(os.path.abspath(__file__))+"/app/uploads/"+str(username)
        if not os.path.exists(directory):
            os.makedirs(directory)
        destination = os.path.join(directory, filename)

        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)

        altered_filename, hist_dest = createEffect(info,destination)

        script_dir = "/uploads/"+str(username) +'/'
        directory = "/uploads/"+str(username)+'/'+ altered_filename

        script_name = scriptCreator(info, script_dir, altered_filename)
        script_dest = script_dir + script_name

        with sqlite3.connect('users.db') as cur:
            cur.execute('''INSERT INTO images (filename, script, filelocation, user, script_location) VALUES (?,?,?,?,?)''',(altered_filename,str(info1),directory,str(username),script_dest))

        return

    @require(member_of("user"))
    @cherrypy.expose
    def upload(self):
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        
        info = cherrypy.request.headers['info']
        info = json.loads(info)
        print "\ninfo -->: "+str(info['effect'])+"\n"
        current_dir = os.path.dirname(os.path.abspath(__file__))+"/app/uploads"
        destination = os.path.join(current_dir, filename)

        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)

        altered_filename, hist_dest = createEffect(info,destination)

        if altered_filename == None:
            returnjson = '{"altered_filename" : "ERROR", "hist_dest" : "The selected effect combination is not allowed"}'
        else:
            script_name = scriptCreator(info, "/scripts_upload", altered_filename)
            returnjson = '{"altered_filename" : "'+str('/uploads/'+altered_filename)+'", "script_name" : "'+str(script_name)+'", "hist_dest" : "'+str(hist_dest)+'"}'
        print "\n"+returnjson+"\n"
        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage)

    @require(member_of("user"))
    @cherrypy.expose
    def uploadMatch(self):
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        
        current_dir = os.path.dirname(os.path.abspath(__file__))+"/app/uploads"
        destination = os.path.join(current_dir, filename)

        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)
        print "/app/uploads/" +filename
        return "/app/uploads/" +filename

    #########################################################################################    
    # New functions 

    @require(member_of("user"))
    @cherrypy.expose
    def submitNewFunc(self):
        username = cherrypy.request.login
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        functionInputName = os.path.basename(cherrypy.request.headers['functionInputName'])
        functionInputNumbArgs = os.path.basename(cherrypy.request.headers['functionInputNumbArgs'])

        directory = os.path.dirname(os.path.abspath(__file__))+"/app/uploads/"+str(username)
        if not os.path.exists(directory):
            os.makedirs(directory)
        destination = os.path.join(directory, filename)        

        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)

        print "++++++++++++++++++++++++++++++++\n"
        print "filename: "+filename+"\tfunctionInputName: "+functionInputName+"\tfunctionInputNumbArgs: "+functionInputNumbArgs
        print "\ndestination: "+ destination
        print "\n++++++++++++++++++++++++++++++++"

        with sqlite3.connect('users.db') as cur:
            cur.execute('''INSERT INTO addedFunctions (func_name, numberofargs, functionfilelocation, user) VALUES (?,?,?,?)''',(functionInputName,functionInputNumbArgs,"/app/uploads/"+str(username)+"/"+filename,str(username))) 

        return "/app/uploads/"+str(username)+"/"+filename

    
        
    #########################################################################################    
    # Load Added functions 

    @require(member_of("user"))
    @cherrypy.expose  
    def getAddedFunctions(self):
        username = cherrypy.request.login
        infolist=[]

        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT func_name, numberofargs, functionfilelocation FROM addedFunctions WHERE user LIKE ?''',(username,))
        infolist = c.fetchall()
        print "infolist"
        print infolist

        if infolist == []:
            returnjson = '{"functionInputName" : "noaddedFunctions"}'
            returnmessage = json.loads(returnjson)
            print returnmessage
            cherrypy.response.headers["Content-Type"] = "application/json"
            return json.dumps(returnmessage)             
        
        returnjson =  '['
        for info in infolist:
            returnjson += '{"functionInputName" : "'+info[0]+'", "functionInputNumbArgs" : '+str(info[1])+', "functionfilelocation" : "'+info[2]+'"},'
            
        returnjson=returnjson[:-1]
        returnjson+=']'
        print returnjson        

        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage) 
    
        
    #########################################################################################    
    # Load custom scripts 

    @require(member_of("user"))
    @cherrypy.expose  
    def getCustomScriptList(self):
        username = cherrypy.request.login
        infolist=[]

        with sqlite3.connect('users.db') as cur:
            c = cur.execute('''SELECT custom_name, effects FROM customScripts WHERE user LIKE ?''',(username,))
        infolist = c.fetchall()
        print "infolist"
        print infolist

        if infolist == []:
            returnjson = '{"custom_name" : "nocustomScript"}'
            returnmessage = json.loads(returnjson)
            print returnmessage
            cherrypy.response.headers["Content-Type"] = "application/json"
            return json.dumps(returnmessage)             
        
        returnjson =  '['
        for info in infolist:
            inf = json.loads(info[1])
            returnjson += '{"custom_name" : "'+str(info[0])+'", "effects" : '+info[1]+'},'
            
        returnjson=returnjson[:-1]
        returnjson+=']'
        print returnjson        

        returnmessage = json.loads(returnjson)
        cherrypy.response.headers["Content-Type"] = "application/json"
        return json.dumps(returnmessage)          

    #########################################################################################    
    # Creation of custom script

    @require(member_of("user"))
    @cherrypy.expose  
    def createCustomScript(self,script_lines, name):
        username = cherrypy.request.login

        print "\nscript_lines" + script_lines +"\n"
        with open("custom_Script.txt", "w") as text_file:
            text_file.write(script_lines)
        info = scriptParser("custom_Script.txt")

        returninfo = json.dumps(info)
        print "\ninfo -->: "+str(info)+"\n"  

        with sqlite3.connect('users.db') as cur:
            cur.execute('''INSERT INTO customScripts (custom_name, effects, user) VALUES (?,?,?)''',(name,returninfo,str(username))) 

        cherrypy.response.headers["Content-Type"] = "application/json"
        return returninfo
            
    #########################################################################################
    # Script related functions

    @require(member_of("user"))
    @cherrypy.expose  
    def getScriptFile(self):
        list_of_files = glob.glob('app/scripts_upload/*')
        latest_file = max(list_of_files, key=os.path.getctime)
        file = open(latest_file, "r")
        return file

    @require(member_of("user"))
    @cherrypy.expose  
    def scriptUpload(self):
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        current_dir = os.path.dirname(os.path.abspath(__file__))+"/app/scripts_upload"
        destination = os.path.join(current_dir, filename)
        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)
        Root.script = destination
        print "SCRIPT ----->>>>>>>>>>>" + Root.script
        return ('/scripts_upload/'+filename)
    
    @require(member_of("user"))
    @cherrypy.expose  
    def viewScript(self):
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        print "FILE NAME ------->>>>>>>>>>>>> " + filename
        f = open('app/scripts_upload/'+filename,"r")
        contents = []
        for line in f:
            contents.append(line)
        print contents
        return contents

    @require(member_of("user"))
    @cherrypy.expose  
    def applyScript(self):
        filename = os.path.basename(cherrypy.request.headers['x-filename'])
        print "SCRIPT ----->>>> APPPPPPPPPLY >>>>>>>" + Root.script
        
        info = scriptParser(Root.script)
        returninfo = str(json.dumps(info['effect']))
        print "\ninfo -->: "+str(info['effect'])+"\n"
        current_dir = os.path.dirname(os.path.abspath(__file__))+"/app/uploads"
        destination = os.path.join(current_dir, filename)

        with open(destination, 'wb') as f:
            shutil.copyfileobj(cherrypy.request.body, f)

        altered_filename, hist_dest = createEffect(info,destination)
        if altered_filename == None:
            return
        else:      
            returnjson = '{"altered_filename" : "'+str('/uploads/'+altered_filename)+'", "script_info" : '+str(returninfo)+', "hist_dest" : "'+str(hist_dest)+'"}'
            print "\n\nRETURNJSON ----------- "+returnjson+"\n\n"
            returnmessage = json.loads(returnjson)
            cherrypy.response.headers["Content-Type"] = "application/json"
            return json.dumps(returnmessage) 
    #########################################################################################

#   Source: 
#   http://commandline.org.uk/python/how-to-find-out-ip-address-in-python/
#   Função que retorna o endereço que se liga à internet, para garantir que é endereço certo.

def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(('google.com', 0))
    ipaddr=s.getsockname()[0]
    return ipaddr

if __name__ == '__main__':
    cherrypy.server.socket_port = 8080
    # Caso opte por inserir manualmente o seu ip, comente a linha abaixo.
    cherrypy.server.socket_host = socket.gethostbyname(get_ip_address())
    # Caso tenha problemas, insira manualmente o seu ip.
    # ip = Insira manualmente o seu ip aqui
    # descomente as linhas superior e inferior
    # cherrypy.server.socket_host = ip
    



    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    conf = {'/': {'tools.staticdir.root': current_dir},             
        '/css':         {   'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/css'},
        '/js':          {   'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/js'},
        '/font-awesome': {  'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/font-awesome'},
        '/images':      {'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/images'},
        '/fonts':       {'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/fonts'},
        '/initial_page_of_app': {'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/initial_page_of_app'},
        '/uploads':     {   'tools.staticdir.on': True,
                            'tools.staticdir.dir': 'app/uploads'},
    }

    cherrypy.tree.mount(Root(),"/",conf)
    cherrypy.engine.start()
    cherrypy.engine.block()
