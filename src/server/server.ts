
//import {microserviceConnection} from '../shared/microservice';
import { Logger } from '@nana-tec/core';
import {pGConnection} from '../shared/database';
import {natsConnImpl} from '../shared/module/nats.impl'
import urmgModule from '../shared/module';
import *  as tmmodule from '../module';

export default class ModuleServer  {
    
    constructor () {
 
    }



   async startUp () {
      try {
   
        await pGConnection.connect();
        await natsConnImpl.connect();
        await urmgModule.startModule();
        
        //tmmodule.registrationSrv.start();

        tmmodule.userProjector.start();
        tmmodule.registrationProjector.start();
        Logger.info(" == Start up sucess  Success ==")
      }
      catch (err) {
        Logger.info(" == Error on starup ==");
        Logger.error(err);
        this.shutdown(err);
      }

    }

   async  shutdown(err:Error) {
      try {
        await urmgModule.StopModule();
        await pGConnection.disconnect();
        await natsConnImpl.disconnect();
        Logger.info(" == Shutdown Success ==")
        process.exit(0);
      }
      catch (err) {
        Logger.error(err)
        Logger.info(" == Shutdown Not Succcess ==")
        process.exit(1);
      }

    }

}

