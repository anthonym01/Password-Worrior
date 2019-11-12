window.addEventListener('load',function(){//window loads
    if(localStorage.getItem(config.configlocation))
        {
            config.load();
            config.data.usecount++;
        }
        else
        {
            config.save();
            config.load();
            config.data.usecount=1;
        }
        config.save();
});

var config={
    data:{
        usecount:0,
    },
    configlocation:"Websitename_cfg",//not strict, can be anything. Think of it as a file name/path
    save:function(){//Save the config file
        localStorage.setItem(config.configlocation,JSON.stringify(config.data));
        console.log('config saved: ');
        console.table(config.data);
    },
    load:function(){//Load the config file into memory
        config.data=JSON.parse(localStorage.getItem(config.configlocation));
        console.log('config Loaded: ');
        console.table(config.data);
        this.validate();
    },
    validate:function(){//validate configuration file
        console.log('Config is being validated');
        var configisvalid = true;
        if(this.data.usecount){
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
        }else{
            console.log('config was found to be valid');
        }
    },
    delete:function(){//Does not delete the file itself. Just sets it to empty
        localStorage.clear(config.configlocation);
        console.log('config deleted: ');
        console.table(config.data);
        this.validate();
    }
}