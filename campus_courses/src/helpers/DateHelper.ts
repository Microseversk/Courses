interface IDate {
	day: string
	month: string
	year: string
	yyyy_mm_dd: string
}
export const DateHelper = {
	to_DD_MM_YYYY: (timestamp: string): IDate => {
		const date = new Date(timestamp)
		const day = date.getDate().toString().padStart(2, '0')
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const year = date.getFullYear().toString()
		const yyyy_mm_dd = `${year}-${month}-${day}`
		return {
			day,
			month,
			year,
			yyyy_mm_dd,
		}
	},
	to_ISO_string: (timestamp: string): string => {
		const date = new Date(timestamp)
		return date.toISOString()
	},
	get_current_year: (): number => {
		const date = new Date()
		return date.getFullYear()
	},

	validate_birth_date: (date: string): boolean | string => {
		const checkedDate = new Date(date)
		const currentDate = new Date()
		const minDate = new Date('1900-01-01')

		if (checkedDate < minDate || checkedDate > currentDate) {
			return `Корректная дата от 01.01.1900 до ${currentDate.getDate()}.${
				currentDate.getMonth() + 1
			}.${currentDate.getFullYear()}`
		}
		return true
	},
}
