import {ProfileLayout} from "../../../components/layouts/profileLayout";

export const ProfilePage = ({tab, user}) => {
	return (
		 <ProfileLayout tab={tab} session={user?.user}>
		 </ProfileLayout>
	);
};

