const TABLE_LIMIT = 50;
const isProduction = !(!process.env.NODE_ENV || process.env.NODE_ENV === 'development');
const tempDate = new Date();
export default {
  TIME_ZONE: -(tempDate.getTimezoneOffset() / 60),
  DEFAULT_TIME_FORMAT: 'DD-MM-YYYY, HH:mm',
  APP_NAME: 'Turbocommerce - Admin Panel',
  DEFAULT_APP_URL: isProduction ? 'production' : 'local',
  SOCKET_URL: isProduction ? 'production' : 'local',
  DEFAULT_PAGE_VALUE: TABLE_LIMIT,
  DATATABLE_PROPERTIES: {
    title: 'Search',
    height: 'auto',
    selectable: false,
    showRowHover: true,
    columns: [],
    data: [],
    count: 0,
    page: 0,
    showCheckboxes: false,
    // showHeaderToolbar: true,
    rowsPerPage: TABLE_LIMIT,
    rowsPerPageOptions: []
  }
};
