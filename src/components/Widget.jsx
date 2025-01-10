import React from 'react';

const Widget2 = ({ key, title, children, className = '', onExpand, expanded }) => {
  if (expanded) {
    return (
      <div className="expanded-widget-overlay" onClick={() => onExpand()}>
        <div className="expanded-widget" onClick={e => e.stopPropagation()}>
          <button className="close-button" onClick={() => onExpand()}>
            <RiCloseLine size={24} />
          </button>
          <h3 className="widget-title">{title}</h3>
          <div className="widget-content">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`widget ${className}`} onClick={onExpand}>
      <h3 className="widget-title">{title}</h3>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};



export default Widget2
