const NewEntryCard = () => {
	return (
		<div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
			<div className="px-4 py-5 sm:p-6">
				<span
					className="text-3xl"
					dangerouslySetInnerHTML={{ __html: 'New Entry &plus;' }}
				></span>
			</div>
		</div>
	);
};

export default NewEntryCard;
