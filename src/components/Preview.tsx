function Preview({ code }: { code: string }) {
	return (
		<iframe
			srcDoc={code}
			className='w-full h-[calc(100vh-64px)] md:h-full rounded-xl'
			title='Preview'
		/>
	)
}

export default Preview
