import {IDefinition} from '@nana-tec/core';
import urmgModule from '../../../shared/module';

const userSrvDefinition:IDefinition = {
    name: 'user',
    version: 'v1',
    description: 'user services that handles all the functionality of a user'
}
const srv = urmgModule.getService(userSrvDefinition);
const userSrv = srv.getResult();

//providerSrv.getServiceApiRegistry().startApi();
export {userSrv}
