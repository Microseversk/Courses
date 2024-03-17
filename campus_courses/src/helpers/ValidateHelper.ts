export const ValidateHelper = {
	validateBirthDate: (date: string): boolean | string => {
		if (!date.length) {
			return 'Обязательное поле'
		}

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
