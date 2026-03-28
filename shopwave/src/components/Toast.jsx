import Icon from './Icon';

const ToastContainer = ({ toasts, removeToast }) => (
  <div className="toast-container">
    {toasts.map(t => (
      <div key={t.id} className={`toast ${t.type} ${t.exiting ? 'exit' : ''}`}>
        <div className="toast-icon">
          {t.type === 'success' ? '✅' : t.type === 'error' ? '❌' : 'ℹ️'}
        </div>
        <span className="toast-msg">{t.msg}</span>
        <button onClick={() => removeToast(t.id)} style={{ color: 'var(--text3)', padding: '0 2px' }}>
          <Icon name="x" size={14} />
        </button>
      </div>
    ))}
  </div>
);

export default ToastContainer;