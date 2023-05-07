import {ServiceBroker,BrokerOptions } from 'moleculer';

export default class MicroserviceConnection {
    private _broker: ServiceBroker;
    constructor (config:BrokerOptions) {
        this._broker = new ServiceBroker(config);
     }
     getBroker (): ServiceBroker {
      return this._broker ;
     }
     start () {
        this._broker.start(); 
     }
}