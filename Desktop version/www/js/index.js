
window.addEventListener('load',function(){//window loads
    if(typeof(require) == 'undefined'){//initialize node modules
        console.log('Running in Browser');
    }else{
        console.log('Running in Node mode');
    }

    if(localStorage.getItem("APPNAME_cfg"))//load up config
        {
            config.load();
            config.data.usecount++;
        }
        else
        {
            config.validate();
        }
});


var config={
    data:{
        usecount:0,
    },
    save:function(){//Save the config file
        localStorage.setItem("APPNAME_cfg",JSON.stringify(config.data));
        console.log('config saved: ');
        console.table(config.data);
    },
    load:function(){//Load the config file into memory
        config.data=JSON.parse(localStorage.getItem("APPNAME_cfg"));
        console.log('config Loaded: ');
        console.table(config.data);
        this.validate();
    },
    validate:function(){//validate configuration file
        console.log('Config is being validated');
        var configisvalid = true;
        if(typeof(this.data.usecount)!='undefined'){
            if(this.data.usecount==undefined ||this.data.usecount<0){
                this.data.usecount=1;
                configisvalid=false;
                console.log('"usecount" was found to be invalid and was set to default');
            }
        }else{
            this.data.usecount=1;
            configisvalid=false;
            console.log('"usecount" did not exist and was set to default');
        }

        if(!configisvalid){
            console.log('config was found to be invalid and will be overwritten');
            this.save();//Save new confog because old config is no longer valid
        }else{console.log('config was found to be valid');}
    },
    delete:function(){//Does not delete the file itself. Just sets it to empty
        localStorage.clear("APPNAME_cfg");
        console.log('config deleted: ');
        console.table(config.data);
        this.validate();
    }
}

let utility = {//Misculanious utilites
    closeapp:function(){//Close the app
        config.save();
        window.close();
    },
    clipboard_push:function(copyText) {
        copyText.toString(); //Makes it a string so the clipboard will accept it
        var temptxtbox = document.createElement("input"); //creates an 'input' element and assigns it to 'temptxtbox'
        document.body.appendChild(temptxtbox); //Puts the input element into the document
        temptxtbox.setAttribute("id", "temp_copy"); //Assigns an id to the input element
        document.getElementById("temp_copy").value = copyText; //Puts the txt u want to copy into the input element
        temptxtbox.select(); //Makes the curser select the text that's in the input element
        document.execCommand("copy"); //Commands the document to copy the selected text
        document.body.removeChild(temptxtbox); //Removes the input element from the document
    },
    rand:{
        HEX:function(){// hex color code
            var randhex ='#'+Math.floor(Math.random()*16777215).toString(16);
            console.log('Random color generated :',randhex);
            return randhex;
        },
        RGB:function(){// RGB color code
            var RGB_obj = { RED:this.number(255,0), GREEN:this.number(255,0), BLUE:this.number(255,0) } 
            console.log('RGB index generated: rgb('+ RGB_obj.RED +','+ RGB_obj.GREEN +','+ RGB_obj.BLUE +')');
            return RGB_obj;
        },
        HSL:function(){// HSL color code
            var HSL_obj = { HUE:this.number(360,0), SATURATION:this.number(100,0)+'%', LIGHTENESS:this.number(100,1)+'%', }
            console.log('HSL index generated: hsl('+ HSL_obj.HUE +','+ HSL_obj.SATURATION +','+ HSL_obj.LIGHTENESS +')');
            return HSL_obj;
        },
        number(max,min){// Random number
            return Math.floor(Math.random() * (max - min + 1) ) + min;
        }
    },
}