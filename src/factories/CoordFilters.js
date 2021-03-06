import FilterTools from './FilterTools';
export default (coords, wc=true, workarea, mouse, keyboard, screen, event=false) => {
    let finalCoords = coords;
    //filter all you want
    if (workarea.snapToGrid){
		finalCoords = {
			x:FilterTools.roundToMultiple(coords.x, (workarea.gridSize)),
			y:FilterTools.roundToMultiple(coords.y, (workarea.gridSize))
		};
    }

    if(keyboard.shift && wc && event.type==='mousemove'){
        let dd = {
            x:finalCoords.x - mouse.offsetDown.x,
            y:finalCoords.y - mouse.offsetDown.y
        };
		let angle = -1 * Math.atan2(dd.y, dd.x) * 180 / Math.PI;
		angle = Math.floor(angle < 0 ? 360 + angle : angle);
		let quadrant = Math.floor((angle-15)/45);
		let lower;
		switch(quadrant){

			case 0: //(45deg) NE
				lower = dd.x<Math.abs(dd.y)?dd.x:Math.abs(dd.y);
				finalCoords = {
					x:mouse.offsetDown.x + lower,
					y:mouse.offsetDown.y - lower
				};
				break;
			case 2: //135
				lower = dd.x>dd.y?dd.x:dd.y;
				finalCoords = {
					x:mouse.offsetDown.x + lower,
					y:mouse.offsetDown.y + lower
				};
				break;
			case 4: //225
				lower = Math.abs(dd.x)<dd.y?Math.abs(dd.x):dd.y;
				finalCoords = {
					x:mouse.offsetDown.x - lower,
					y:mouse.offsetDown.y + lower
				};
				break;
			case 6: //305
				lower = dd.x<dd.y?dd.x:dd.y;
				finalCoords = {
					x:mouse.offsetDown.x + lower,
					y:mouse.offsetDown.y + lower
				};
				break;
			case 1: //270px
            case 5:
				finalCoords = {
					x: mouse.offsetDown.x,
					y:finalCoords.y
				};
				break;
			case -1:
            case 7:
            case 3: //(-1 and 7 and 3)
				finalCoords = {
					x: finalCoords.x,
					y: mouse.offsetDown.y
				};
                break;
            default:;
		}
	}
    return finalCoords;
};
