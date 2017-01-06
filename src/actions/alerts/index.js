export const ALERT_ADD = 'ALERT_ADD';
export const ALERT_REMOVE = 'ALERT_REMOVE';

function rand() {
    const n = Math.random() * 1e17;
    return (n + "").substr(1, 16);
}

const createAlert = (error) => ({
    id: rand(),
    message: error.response.data.error,
    description: error.message
});

export const alertAdd = (error) => ({
  type: ALERT_ADD,
  alert: createAlert(error)
});

export const removeAlert = (alert) => ({
  type: ALERT_REMOVE,
  alert
});
