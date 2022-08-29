import * as React from 'react'
import { Stage, Layer, Line, Text } from "react-konva";
import { Image } from 'react-konva';
import useKonvaImage from 'react-konva-image';

const DrawingColors = () => {
    const [tool, setTool] = React.useState("pen");
    const [lines, setLines] = React.useState([]);
    const [chooseColor, setChooseColor] = React.useState("#000000");
    const [choosePen, setChoosePen] = React.useState(10);
    const isDrawing = React.useRef(false);

    const imgUrl = 'animal.png';
    const [image] = useKonvaImage(imgUrl);

    const handleMouseDown = (e) => {
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setLines([...lines, { choosePen ,chooseColor, tool, points: [pos.x, pos.y] }]);
    };

    const handleMouseMove = (e) => {
        if (!isDrawing.current) {
            return;
        }
        const stage = e.target.getStage();

        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        
        lastLine.points = lastLine.points.concat([point.x, point.y]);

        lines.splice(lines.length - 1, 1, lastLine);

        setLines(lines.concat());
    };

    const handleMouseUp = () => {
        isDrawing.current = false;
    };

    return (
        <div>
            <div style={{ display: 'flex'}}>
                <select
                    style={{ marginLeft: 7 }}
                    value={tool}
                    onChange={(e) => {
                    setTool(e.target.value);
                    }}
                >
                    <option value="pen">Pen</option>
                    <option value="eraser">Eraser</option>
                </select>
                <select
                    style={{ marginLeft: 7 }}
                    value={chooseColor}
                    onChange={(e) => {
                    setChooseColor(e.target.value);
                    }}
                >
                    <option value={"#ff0000"}>Red</option>
                    <option value={"#ffff00"}>Yellow</option>
                    <option value={"#008000"}>Green</option>
                    <option value={"#808080"}>Gray</option>
                    <option value={"#ffc0cb"}>Pink</option>
                    <option value={"#0000ff"}>Blue</option>
                    <option value={"#ccccff"}>Sky Blue</option>
                    <option value={"#00ff00"}>Lime</option>
                    <option value={"#ffa500"}>Orange</option>
                    <option value={"#000000"}>Black</option>
                </select>   
                <select
                    style={{ marginLeft: 7 }}
                    value={choosePen}
                    onChange={(e) => {
                    setChoosePen(Number(e.target.value));
                    }}
                >
                    <option value={30}>Big</option>
                    <option value={10}>Small</option>
                </select>
                <button style={{ marginLeft: 7 }} onClick={() => setLines([])}>Start over</button>
            </div>
            <div>
                <Stage
                    width={window.innerWidth}
                    height={window.innerHeight}
                    onMouseDown={handleMouseDown}
                    onMousemove={handleMouseMove}
                    onMouseup={handleMouseUp}
                >
                    <Layer>
                        <Text text="Just start drawing" x={5} y={30} />
                        {lines.map((line, i) => (
                            <Line
                            key={i}
                            points={line.points}
                            stroke={line.chooseColor}
                            strokeWidth={line.choosePen}
                            tension={0.5}
                            lineCap="round"
                            globalCompositeOperation={
                                line.tool === "eraser" ? "destination-out" : "source-over"
                            }
                            />
                        ))}
                        <Image image={image} />
                    </Layer>
                </Stage>
            </div>
        </div>

    );
};

export default DrawingColors;
