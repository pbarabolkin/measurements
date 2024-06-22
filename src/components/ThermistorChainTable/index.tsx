import CustomTable from '../common/CustomTable';
import moment from 'moment';
import { ThermistorChain } from '../../types';
import FilterPanel from '../common/FilterPanel';
import styles from './styles.module.scss';

const ThermistorChainTable = ({
  tableData,
  setFilterStartDate,
  setFilterEndDate,
}: {
  tableData: ThermistorChain[];
  setFilterStartDate: (val: string) => void;
  setFilterEndDate: (val: string) => void;
}) => {
  const dynamicColumnsSet = new Set<string>();
  tableData.forEach((item) => {
    Object.keys(item.data).forEach((key) => {
      dynamicColumnsSet.add(key);
    });
  });

  return (
    <div className={styles.tableContainer}>
      <h2>Термометрическая скважина</h2>
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
              title: 'Tₑ',
              field: 'averageTemperature',
              formatter: function (val: number) {
                return val ? val.toFixed(2) : val;
              },
            },
            ...Array.from(dynamicColumnsSet)
              .sort((a, b) => {
                const aNumber = +a;
                const bNumber = +b;
                if (aNumber < bNumber) {
                  return -1;
                } else if (aNumber > bNumber) {
                  return 1;
                }

                return 0;
              })
              .map((item) => {
                return {
                  title: item,
                  field: 'data',
                  formatter: function (val: any) {
                    return val && val[item]
                      ? val[item].value.toFixed(2)
                      : undefined;
                  },
                };
              }),
          ],
          data: tableData,
          fixedColumns: true,
          fixedNumber: 2,
          onPostHeader: (bTable: any) => {
            // this all needed to add extra row into table header
            const $tr = bTable.$tableHeader.find('thead > tr');
            let $clone = $tr.clone();
            $clone.addClass(styles.firstRow);
            $clone.find('th:nth-child(n+4)').remove();
            $clone.find('th:not(:last-child)').attr('rowspan', '2');
            $clone
              .find('th:last-child')
              .attr('colspan', dynamicColumnsSet.size)
              .text('Глубина, м');
            $clone.insertBefore($tr);
            $tr.find('th:nth-child(1),th:nth-child(2)').remove();
          },
        }}
      ></CustomTable>
    </div>
  );
};

export default ThermistorChainTable;
