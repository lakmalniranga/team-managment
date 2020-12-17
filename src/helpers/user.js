import userRepo from '@users/repositories';
import userBusiness from '@users/business';

export function getUserRepo() {
	return userRepo;
}

export function getUserBusiness() {
	return userBusiness;
}
