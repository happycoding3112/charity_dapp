import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CampaignDetails from '../components/CampaignDetails';
import DeleteCampaign from '../components/DeleteCampaign';
import Donors from '../components/Donors';
import EditCampaign from '../components/EditCampaign';
import FundCampaign from '../components/FundCampaign';
import { getDonors, loadCampaign } from '../services/blockchain';
import { useGlobalState } from '../store';

const Campaign = () => {
	const { id } = useParams();
	const [campaign] = useGlobalState('campaign');
	const [donors] = useGlobalState('donors');

	useEffect(async () => {
		await loadCampaign(id);
		await getDonors(id);
	}, [donors]);

	return (
		<>
			<CampaignDetails campaign={campaign} />
			<FundCampaign campaign={campaign} />
			<DeleteCampaign campaign={campaign} />
			<EditCampaign campaign={campaign} />
			<Donors donors={donors} />
		</>
	);
};

export default Campaign;
