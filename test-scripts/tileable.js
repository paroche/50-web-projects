console.log("# Sides of tileable regular polygons");
for (let i = 3; i < 50; i++) {
  let innerAngle = (180-(360/i));
  //if (Number.isInteger(innerAngle)) console.log("Sides: ",i, " Inner angle: ",innerAngle);
  let p = 360 / innerAngle;
  if (Number.isInteger(p)) {
    console.log("");
    console.log(i);
    console.log("Inner angle: ", innerAngle);
    let area;
    if (i==3) {area = Math.sqrt(3) / 12}
    else if (i==4) {area = 1/4}
    else if (i==6) {area = Math.sqrt(3) / 4};
    console.log("Area for each unit of boundary x: x^2 * ",area);
}
}