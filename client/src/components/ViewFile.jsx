import { Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

const ViewFile = () => {
	const { doc } = useParams();

	const navigate = useNavigate();

	const defaultLayoutPluginInstance = defaultLayoutPlugin();

	const onClose = () => {
		navigate(-1);
	};

	return (
		<div className='fixed top-0 left-0 flex justify-center items-center h-screen w-screen py-4 z-[999] bg-white'>
			<div className='h-full w-3/5 bg-gray-700 rounded-md pb-10'>
				<div className='w-full flex justify-between items-center p-2 text-white'>
					<p>View Supporting Document</p>
					<FaTimes className='cursor-pointer' onClick={onClose} />
				</div>
				<Viewer
					plugins={[defaultLayoutPluginInstance]}
					fileUrl={'/clientUploads/' + doc}
				/>
			</div>
		</div>
	);
};

export default ViewFile;
