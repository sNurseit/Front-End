import React, {setActivate}  from'react';



function popup() {
    return(
        
        <div className="popup" onClick={() => setActivate(false)}>
            <div className="popup-content" onClick={e=> e.stopPropagation}>

            </div>
        </div>
    )
}
export default popup;