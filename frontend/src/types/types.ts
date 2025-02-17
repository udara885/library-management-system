export type Book = {
	_id?: string
	title: string
	author: string
	category: string
	image: string
	publicationYear: string
	description?: string
}

export type Rent = {
	_id?: string
	memberId: string
	bookId: string
	fromDate: string
	toDate: string
}

export type Member = {
	_id?: string
	name: string
	email: string
	phone: string
}
