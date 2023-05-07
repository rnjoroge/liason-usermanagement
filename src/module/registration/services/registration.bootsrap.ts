import {IDefinition} from '@nana-tec/core';
import urmgModule from '../../../shared/module';

const registrationSrvDefinition:IDefinition = {
    name: 'registration',
    version: 'v1',
    description: 'registration services that handles all the functionality of a registration'
}
const srv = urmgModule.getService(registrationSrvDefinition);
const registrationSrv = srv.getResult();

//providerSrv.getServiceApiRegistry().startApi();
export {registrationSrv}
