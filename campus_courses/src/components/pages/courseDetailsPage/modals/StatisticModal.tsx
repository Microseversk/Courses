import { useMemo } from 'react'
import { Modal, ModalBody, ModalHeader } from 'react-bootstrap'
import Chart from 'react-google-charts'
import { useTypedSelector } from '../../../../hooks/useTypedSelector'
import { IModalProps } from '../../../../types/common.types'
import { IStudent } from '../../../../types/response.types'

const options = {
	animation: {
		duration: 1000,
		easing: 'out',
		startup: true,
	},
	legend: {
		position: 'none',
	},
	colors: ['#34eb6e', '#eb3437', '#b0a9a9'],
}

type StatsResults = {
	MPassed: number
	MFailed: number
	MNotDefined: number
	FPassed: number
	FFailed: number
	FNotDefined: number
}
const acs: StatsResults = {
	MPassed: 0,
	MFailed: 0,
	MNotDefined: 0,
	FPassed: 0,
	FFailed: 0,
	FNotDefined: 0,
}

const onExportCsv = (data: (string | number)[][]) => {
	return 'data:text/csv;charset=utf-8,' + data.map(row => row.join(',')).join('\n')
}

const getStudentsStats = (students: IStudent[]): StatsResults => {
	return students
		?.filter(s => s.status === 'Accepted')
		.reduce((acs, item) => {
			return {
				MPassed: item.midtermResult === 'Passed' ? acs.MPassed + 1 : acs.MPassed,
				MFailed: item.midtermResult === 'Failed' ? acs.MFailed + 1 : acs.MFailed,
				MNotDefined: item.midtermResult === 'NotDefined' ? acs.MNotDefined + 1 : acs.MNotDefined,
				FPassed: item.finalResult === 'Passed' ? acs.FPassed + 1 : acs.FPassed,
				FFailed: item.finalResult === 'Failed' ? acs.FFailed + 1 : acs.FFailed,
				FNotDefined: item.finalResult === 'NotDefined' ? acs.FNotDefined + 1 : acs.FNotDefined,
			}
		}, acs)
}

export function StatisticModal(props: IModalProps) {
	const { students, name } = useTypedSelector(state => state.openedCourse.course!)

	const results = useMemo(() => getStudentsStats(students), [students])

	const data = [
		['', 'Успешно', 'Провал', 'Нет результата'],
		['Промежуточная аттестация', results?.MPassed, results?.MFailed, results?.MNotDefined],
		['Финальная аттестация', results?.FPassed, results?.FFailed, results?.FNotDefined],
	]

	return (
		<Modal show={props.isShow} onHide={props.onHide} size='xl'>
			<ModalHeader>
				Статистика курса
				<a className='btn btn-primary ms-auto' href={`${onExportCsv(data)}`} download={`${name}_stats`}>
					CSV
				</a>
			</ModalHeader>
			<ModalBody>
				<Chart chartType='ColumnChart' width={'100%'} height={'90%'} data={data} options={options} />
			</ModalBody>
		</Modal>
	)
}
