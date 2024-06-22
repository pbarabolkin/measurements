import { useId } from 'react';

const FilterPanel = ({
  setFilterStartDate,
  setFilterEndDate,
}: {
  setFilterStartDate: (val: string) => void;
  setFilterEndDate: (val: string) => void;
}) => {
  const startDateId = useId();
  const endDateId = useId();

  return (
    <div className="row">
      <div className="col-sm-6 mb-3">
        <label htmlFor={startDateId} className="form-label">
          Start Date
        </label>
        <input
          type="date"
          className="form-control"
          id={startDateId}
          onChange={({ target }) => {
            setFilterStartDate(target.value);
          }}
        />
      </div>
      <div className="col-sm-6 mb-3">
        <label htmlFor={endDateId} className="form-label">
          End Date
        </label>
        <input
          type="date"
          className="form-control"
          id={endDateId}
          onChange={({ target }) => {
            setFilterEndDate(target.value);
          }}
        />
      </div>
    </div>
  );
};

export default FilterPanel;
