function Preview({ code }: { code: string }) {
	return (
		<iframe
			srcDoc={code}
			className='w-full h-full rounded-xl'
			title='Preview'
		/>
	)
}

export default Preview
