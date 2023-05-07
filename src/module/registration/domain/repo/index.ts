import {repoImpl} from '../../../../shared/database';
import {registrationMapper} from '../mapper';
import RegistrationRepo from './registration.repo';


const registrationRepo = new RegistrationRepo(repoImpl,registrationMapper);
export {registrationRepo}
