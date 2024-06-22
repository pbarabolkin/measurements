import CustomTable from '../common/CustomTable';
import moment from 'moment';
import { DeformationControl } from '../../types';
import FilterPanel from '../common/FilterPanel';

const DeformationControlTable = ({
  tableData,
  setFilterStartDate,
  setFilterEndDate,
}: {
  tableData: DeformationControl[];
  setFilterStartDate: (val: string) => void;
  setFilterEndDate: (val: string) => void;
}) => {
  return (
    <div>
      <h2>Деформационная марка</h2>
      <FilterPanel
        setFilterStartDate={setFilterStartDate}
        setFilterEndDate={setFilterEndDate}
      />
      <CustomTable
        options={{
          height: 400,
          columns: [
            {
              title: 'Дата и время измерения',
              field: 'time',
              sortable: true,
              formatter: function (val: number) {
                return val ? moment(val).format('DD.MM.YYYY HH:mm') : val;
              },
            },
            {
              title: 'Цикл измерения',
              field: '',
            },
            {
              title: 'Отметка',
              field: 'data.value',
              formatter: function (val: number) {
                return val ? val.toFixed(4) : val;
              },
            },
            {
              title: 'Δ, м',
              field: 'data.delta',
              formatter: function (val: number) {
                return val ? val.toFixed(4) : val;
              },
            },
          ],
          data: tableData,
          fixedColumns: true,
          fixedNumber: 1,
        }}
      ></CustomTable>
    </div>
  );
};

export default DeformationControlTable;
