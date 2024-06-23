import { useEffect, useRef } from 'react';
import $ from 'jquery';
import styles from './styles.module.scss';

// required for bootstrap-table correct work
window.$ = $;
window.jQuery = $;

const CustomTable = ({ options }: { options: any }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    const tableEl = tableRef.current;
    const buildTable = async function (el: HTMLElement) {
      await import('bootstrap-table');
      await import(
        'bootstrap-table/src/extensions/fixed-columns/bootstrap-table-fixed-columns.js'!
      );
      $(el).bootstrapTable('destroy').bootstrapTable(options);
    };

    if (tableEl) {
      $(function () {
        buildTable(tableEl);
      });
    }

    return () => {
      if (tableRef.current && $(tableRef.current).bootstrapTable) {
        $(tableRef.current).bootstrapTable('destroy');
      }
    };
  }, [options]);

  return <table ref={tableRef}></table>;
};

export default CustomTable;
