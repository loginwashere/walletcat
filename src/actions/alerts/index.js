export const ALERT_ADD = 'ALERT_ADD';
export const ALERT_REMOVE = 'ALERT_REMOVE';

function rand() {
    const n = Math.random()*1e17;
    return (n + "").substr(1,16);
}

export function alertAdd(alert) {
  const alertWithId = {
    ...alert,
    id: rand()
  }
  return {
    type: ALERT_ADD,
    alert: alertWithId
  }
}

export function removeAlert(alert) {
  return {
    type: ALERT_REMOVE,
    alert
  }
}
