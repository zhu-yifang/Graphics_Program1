//
// Program 1: object showcase
//
// showcase.js
//
// CSCI 385: Computer Graphics, Reed College, Spring 2022
//
// This is a sample `opengl.js` program that displays a tetrahedron 
// made up of triangular facets, and also a cube and a cylinder.
//
// The OpenGL drawing part of the code occurs in drawScene and that
// function relies on drawObject to do its work. There is a global
// variable showWhich that can be changed by the user (by pressing
// number keys handled by handleKey). The drawObject code calls
// glBeginEnd to draw the chosen object.
//
// Your assignment is to add these models to the showcase code:
//
// - Sphere: A faceted model of the surface of a sphere.
// - Torus:A faceted model of the surface of a torus.
// - Revolution: Some other *surfaces of revolution*.
// - Programmer's choice: either of the following:
//    - Terrain: A faceted model of some gridded terrain.
//    - Pasta: A faceted mode of some shape of pasta.
//
// FOr each of these, you'll write functions that describe the
// object in 3-space, modify drawObject to draw them, and modify
// the keyboard handler code in handleKey to allow the user to
// select and configure them.
//
// This is all described in the web document
//
//   http://jimfix.github.io/csci385/assignments/showcase.md.html
//


//
let orientation = quatClass.for_rotation(0.0, new vector(1.0,0.0,0.0));
let mouseStart  = {x: 0.0, y: 0.0};
let mouseDrag   = false;
//
let showWhich = 1;
//

function makeCube() {
    /*
     * This describes the facets of a cube
     */

     glBegin(GL_TRIANGLES,"Cube",true);
    // front
    glColor3f(0.5,0.5,0.0);
    glVertex3f(-0.5,-0.5, 0.5);
    glVertex3f( 0.5,-0.5, 0.5);
    glVertex3f( 0.5, 0.5, 0.5);
    
    glVertex3f( 0.5, 0.5, 0.5);
    glVertex3f(-0.5, 0.5, 0.5);
    glVertex3f(-0.5,-0.5, 0.5);
    
    // back
    glColor3f(0.5,0.5,1.0);
    glVertex3f(-0.5,-0.5,-0.5);
    glVertex3f( 0.5,-0.5,-0.5);
    glVertex3f( 0.5, 0.5,-0.5);
    
    glVertex3f( 0.5, 0.5,-0.5);
    glVertex3f(-0.5, 0.5,-0.5);
    glVertex3f(-0.5,-0.5,-0.5);

    // left
    glColor3f(1.0,0.5,0.5);
    glVertex3f(-0.5,-0.5,-0.5);
    glVertex3f(-0.5, 0.5,-0.5);
    glVertex3f(-0.5, 0.5, 0.5);
    
    glVertex3f(-0.5, 0.5, 0.5);
    glVertex3f(-0.5,-0.5, 0.5);
    glVertex3f(-0.5,-0.5,-0.5);
    
    // right
    glColor3f(0.0,0.5,0.5);
    glVertex3f( 0.5,-0.5,-0.5);
    glVertex3f( 0.5, 0.5,-0.5);
    glVertex3f( 0.5, 0.5, 0.5);
    
    glVertex3f( 0.5, 0.5, 0.5);
    glVertex3f( 0.5,-0.5, 0.5);
    glVertex3f( 0.5,-0.5,-0.5);
    
    // top
    glColor3f(0.5,1.0,0.5);
    glVertex3f(-0.5, 0.5,-0.5);
    glVertex3f( 0.5, 0.5,-0.5);
    glVertex3f( 0.5, 0.5, 0.5);
    
    glVertex3f( 0.5, 0.5, 0.5);
    glVertex3f(-0.5, 0.5, 0.5);
    glVertex3f(-0.5, 0.5,-0.5);

    // bottom
    glColor3f(0.5,0.0,0.5);
    glVertex3f(-0.5,-0.5,-0.5);
    glVertex3f( 0.5,-0.5,-0.5);
    glVertex3f( 0.5,-0.5, 0.5);
    
    glVertex3f( 0.5,-0.5, 0.5);
    glVertex3f(-0.5,-0.5, 0.5);
    glVertex3f(-0.5,-0.5,-0.5);

    //
    glEnd();
}

function makeCylinder() {
    /* 
     * This describes the facets of a 24-sided cylindrical
     * object.
     */

     const width = 1.0;
     const numFacets = 24;
     const dAngle = 2.0 * Math.PI / numFacets;

     glBegin(GL_TRIANGLES, "Cylinder", true);

    // Produce the top.
    for (let i = 0; i < numFacets; i += 1) {
        const aTop = dAngle * i;
        const xTop0 = Math.cos(aTop);
        const yTop0 = Math.sin(aTop);
        const xTop1 = Math.cos(aTop + dAngle);
        const yTop1 = Math.sin(aTop + dAngle);
        if (i % 2 == 0) {
         glColor3f(0.25, 0.50, 0.75);
     } else {
         glColor3f(0.50, 0.75, 0.80);
     }
     glVertex3f(  0.0,   0.0, width / 2.0);
     glVertex3f(xTop0, yTop0, width / 2.0);
     glVertex3f(xTop1, yTop1, width / 2.0);
 }

    // Produce the sides.
    for (let i = 0; i < numFacets; i += 1) {
        const aMid = dAngle * i;
        const xMid0 = Math.cos(aMid);
        const yMid0 = Math.sin(aMid);
        const xMid1 = Math.cos(aMid + dAngle);
        const yMid1 = Math.sin(aMid + dAngle);

        glColor3f(0.25, 0.50, 0.75);
        glVertex3f(xMid0, yMid0,  width / 2.0);
        glVertex3f(xMid0, yMid0, -width / 2.0);
        glVertex3f(xMid1, yMid1, -width / 2.0);

        glColor3f(0.50, 0.75, 0.80);
        glVertex3f(xMid0, yMid0,  width / 2.0);
        glVertex3f(xMid1, yMid1, -width / 2.0);
        glVertex3f(xMid1, yMid1,  width / 2.0);

    }
    
    // Produce the bottom.
    for (let i = 0; i < numFacets; i += 1) {
        const aBottom = dAngle * i;
        const xBottom0 = Math.cos(aBottom);
        const yBottom0 = Math.sin(aBottom);
        const xBottom1 = Math.cos(aBottom + dAngle);
        const yBottom1 = Math.sin(aBottom + dAngle);
        if (i % 2 == 0) {
         glColor3f(0.25, 0.50, 0.75);
     } else {
         glColor3f(0.50, 0.75, 0.80);
     }
     glVertex3f(     0.0,      0.0, -width / 2.0);
     glVertex3f(xBottom0, yBottom0, -width / 2.0);
     glVertex3f(xBottom1, yBottom1, -width / 2.0);
 }

 glEnd();
}

function makeSphere(){
    const theta = 0;
    const phi = 0;
    // numTheta and numPhi for smoothness
    const numTheta = 16;
    const numPhi = 16;
    const dTheta = (Math.PI) / numTheta;
    const dPhi = (2 * Math.PI) / numPhi;
    const radius = 1
    glBegin(GL_TRIANGLES, "Sphere", true);

    // draw the top
    for (let i = 0; i < numPhi; i++){
        let p1_x = radius * Math.sin(dTheta) * Math.cos(i * dPhi);
        let p1_y = radius * Math.sin(dTheta) * Math.sin(i * dPhi);
        let p1_z = radius * Math.cos(dTheta);
        let p2_x = radius * Math.sin(dTheta) * Math.cos((i+1) * dPhi);
        let p2_y = radius * Math.sin(dTheta) * Math.sin((i+1) * dPhi);
        let p2_z = p1_z;
        if (i % 2 == 0) {
            glColor3f(0.25, 0.50, 0.75);
        } else {
            glColor3f(0.50, 0.75, 0.80);
        }
        glVertex3f(0, 0, radius);
        glVertex3f(p1_x, p1_y, p1_z);
        glVertex3f(p2_x, p2_y, p2_z);
    }

    // draw the sides
    for (let i = 1; i < numTheta - 1; i++){
        for (let j = 0; j < numPhi; j++){
            let p1_x = radius * Math.sin(i * dTheta) * Math.cos(j * dPhi);
            let p1_y = radius * Math.sin(i * dTheta) * Math.sin(j * dPhi);
            let p1_z = radius * Math.cos(i * dTheta);
            let p2_x = radius * Math.sin(i * dTheta) * Math.cos((j+1) * dPhi);
            let p2_y = radius * Math.sin(i * dTheta) * Math.sin((j+1) * dPhi);
            let p2_z = radius * Math.cos(i * dTheta);
            let p3_x = radius * Math.sin((i + 1) * dTheta) * Math.cos(j * dPhi);
            let p3_y = radius * Math.sin((i + 1) * dTheta) * Math.sin(j * dPhi);
            let p3_z = radius * Math.cos((i + 1) * dTheta);
            let p4_x = radius * Math.sin((i + 1) * dTheta) * Math.cos((j + 1) * dPhi);
            let p4_y = radius * Math.sin((i + 1) * dTheta) * Math.sin((j + 1) * dPhi);
            let p4_z = radius * Math.cos((i + 1) * dTheta);            
            glColor3f(0.50, 0.75, 0.80);
            glVertex3f(p1_x, p1_y, p1_z);
            glVertex3f(p3_x, p3_y, p3_z);
            glVertex3f(p4_x, p4_y, p4_z);
            
            glColor3f(0.25, 0.50, 0.75);
            glVertex3f(p1_x, p1_y, p1_z);
            glVertex3f(p2_x, p2_y, p2_z);
            glVertex3f(p4_x, p4_y, p4_z);
        }
    }
    // draw the bottom
    for (let i = 0; i < numPhi; i++){
        let p1_x = radius * Math.sin(dTheta) * Math.cos(i * dPhi);
        let p1_y = radius * Math.sin(dTheta) * Math.sin(i * dPhi);
        let p1_z = radius * Math.cos(dTheta);
        let p2_x = radius * Math.sin(dTheta) * Math.cos((i+1) * dPhi);
        let p2_y = radius * Math.sin(dTheta) * Math.sin((i+1) * dPhi);
        let p2_z = p1_z;
        if (i % 2 == 0) {
            glColor3f(0.25, 0.50, 0.75);
        } else {
            glColor3f(0.50, 0.75, 0.80);
        }
        glVertex3f(0, 0, -radius);
        glVertex3f(p1_x, p1_y, -p1_z);
        glVertex3f(p2_x, p2_y, -p2_z);
    }

    glEnd();
}

function makeTorus(){
    // numBigCircle and numSmallCircle for smoothness
    const numBigCircle = 32;
    const numSmallCircle = 16;
    const dPhi = (2 * Math.PI) / numBigCircle;
    const dTheta = (2 * Math.PI) / numSmallCircle;
    const Radius = 1;
    const radius = 0.5;
    glBegin(GL_TRIANGLES, "Torus", true);
    for (let i = 0; i < numBigCircle; i++){
        let phi = dPhi * i;
        let center0_x = Radius * Math.cos(phi);
        let center0_y = Radius * Math.sin(phi);
        let center0_z = 0;
        let center1_x = Radius * Math.cos(phi + dPhi);
        let center1_y = Radius * Math.sin(phi + dPhi);
        let center1_z = 0;
        for (let j = 0; j < numSmallCircle; j++){
            let theta = dTheta * j;

            let a0_length = Math.sqrt(Math.pow(center0_x, 2) + Math.pow(center0_y, 2));
            let a0_x = center0_x / a0_length;
            let a0_y = center0_y / a0_length;
            let a0_z = 0;

            let b0_x = 0;
            let b0_y = 0;
            let b0_z = 1;

            let x0 = center0_x + radius * Math.cos(theta) * a0_x + radius * Math.sin(theta) * b0_x;
            let y0 = center0_y + radius * Math.cos(theta) * a0_y + radius * Math.sin(theta) * b0_y;
            let z0 = center0_z + radius * Math.cos(theta) * a0_z + radius * Math.sin(theta) * b0_z;

            let x1 = center0_x + radius * Math.cos(theta + dTheta) * a0_x + radius * Math.sin(theta + dTheta) * b0_x;
            let y1 = center0_y + radius * Math.cos(theta + dTheta) * a0_y + radius * Math.sin(theta + dTheta) * b0_y;
            let z1 = center0_z + radius * Math.cos(theta + dTheta) * a0_z + radius * Math.sin(theta + dTheta) * b0_z;

            let a1_length = Math.sqrt(Math.pow(center1_x, 2) + Math.pow(center1_y, 2));
            let a1_x = center1_x / a1_length;
            let a1_y = center1_y / a1_length;
            let a1_z = 0;

            let b1_x = 0;
            let b1_y = 0;
            let b1_z = 1;

            let x2 = center1_x + radius * Math.cos(theta) * a1_x + radius * Math.sin(theta) * b1_x;
            let y2 = center1_y + radius * Math.cos(theta) * a1_y + radius * Math.sin(theta) * b1_y;
            let z2 = center1_z + radius * Math.cos(theta) * a1_z + radius * Math.sin(theta) * b1_z;

            let x3 = center1_x + radius * Math.cos(theta + dTheta) * a1_x + radius * Math.sin(theta + dTheta) * b1_x;
            let y3 = center1_y + radius * Math.cos(theta + dTheta) * a1_y + radius * Math.sin(theta + dTheta) * b1_y;
            let z3 = center1_z + radius * Math.cos(theta + dTheta) * a1_z + radius * Math.sin(theta + dTheta) * b1_z;
 
            glColor3f(0.25, 0.50, 0.75);
            glVertex3f(x0, y0, z0);
            glVertex3f(x1, y1, z1);
            glVertex3f(x3, y3, z3);
            glColor3f(0.50, 0.75, 0.80);
            glVertex3f(x0, y0, z0);
            glVertex3f(x3, y3, z3);
            glVertex3f(x2, y2, z2);

        }
    }
    glEnd();
}

function makeRevolution(name, points){
    const smoothness = 32;
    const dPhi = (2 * Math.PI) / smoothness;
    const numPoints = points.length;

    glBegin(GL_TRIANGLES, name, true);
    
    for (let i = 0; i < smoothness; i++){
        let phi = i * dPhi;
        // j < numPoints for closed surface
        for (let j = 0; j < numPoints - 1; j++){
            //center0_x = 0;
            //center0_y = 0;
            let center0_z = points[j].y;
            //center1_x = 0;
            //center1_y = 0;
            let center1_z = points[j+1].y;
            let radius0 = Math.abs(points[j].x);
            let x0 = radius0 * Math.cos(phi);
            let y0 = radius0 * Math.sin(phi);
            let z0 = center0_z;
            let x1 = radius0 * Math.cos(phi + dPhi);
            let y1 = radius0 * Math.sin(phi + dPhi);
            let z1 = center0_z;
            let radius1 = Math.abs(points[j+1].x);
            let x2 = radius1 * Math.cos(phi);
            let y2 = radius1 * Math.sin(phi);
            let z2 = center1_z;
            let x3 = radius1 * Math.cos(phi + dPhi);
            let y3 = radius1 * Math.sin(phi + dPhi);
            let z3 = center1_z;

            glColor3f(0.25, 0.50, 0.75);
            glVertex3f(x0, y0, z0);
            glVertex3f(x1, y1, z1);
            glVertex3f(x2, y2, z2);
            glColor3f(0.50, 0.75, 0.80);
            glVertex3f(x1, y1, z1);
            glVertex3f(x2, y2, z2);
            glVertex3f(x3, y3, z3);
        }
    }
    glEnd()
}

function drawBowl(){
    const point0 = new point(0, 0);
    const point1 = new point(1, 0);
    const point2 = new point(1.5, 0.5);
    const point3 = new point(1.5, 1);
    const points = [point0, point1, point2, point3];
    makeRevolution("Bowl", points);
}

function makePasta(){
    const numPhi = 32;
    const dPhi = (2 * Math.PI) / numPhi;
    glBegin(GL_TRIANGLES, "Pasta", true);
    const radius0 = 0.2;
    const radius1 = 0.25;
    for (let i = 0; i < numPhi; i++){
        let phi = i * dPhi;
        let p0_x = radius1 * Math.cos(phi);
        let p0_y = radius1 * Math.sin(phi);
        let p0_z = 1;
        let p1_x = p0_x;
        let p1_y = p0_y;
        let p1_z = -p0_z;
        let p2_x = radius0 * Math.cos(phi + 1/2 * dPhi);
        let p2_y = radius0 * Math.sin(phi + 1/2 * dPhi);
        let p2_z = p0_z;
        let p3_x = radius0 * Math.cos(phi + 1/2 * dPhi);
        let p3_y = radius0 * Math.sin(phi + 1/2 * dPhi);
        let p3_z = -p2_z;
        let p4_x = radius1 * Math.cos(phi + dPhi);
        let p4_y = radius1 * Math.sin(phi + dPhi);
        let p4_z = p0_z;
        let p5_x = radius1 * Math.cos(phi + dPhi);
        let p5_y = radius1 * Math.sin(phi + dPhi);
        let p5_z = -p4_z;
        glColor3f(0.83, 0.77, 0.48);
        glVertex3f(p0_x, p0_y, p0_z);
        glVertex3f(p1_x, p1_y, p1_z);
        glVertex3f(p2_x, p2_y, p2_z);
        glColor3f(0.83, 0.77, 0.48);
        glVertex3f(p3_x, p3_y, p3_z);
        glVertex3f(p1_x, p1_y, p1_z);
        glVertex3f(p2_x, p2_y, p2_z);
        glColor3f(0.65, 0.48, 0.01);
        glVertex3f(p2_x, p2_y, p2_z);
        glVertex3f(p3_x, p3_y, p3_z);
        glVertex3f(p4_x, p4_y, p4_z);
        glColor3f(0.65, 0.48, 0.01);
        glVertex3f(p5_x, p5_y, p5_z);
        glVertex3f(p3_x, p3_y, p3_z);
        glVertex3f(p4_x, p4_y, p4_z);
    }
    glEnd();
}
function makeTetra() {

    // This describes the facets of a tetrahedron whose
    // vertices sit at 4 of the 8 corners of the 
    // of the cube volume [-1,1] x [-1,1] x [-1,1].
    //
    // It's an example of GL_TRIANGLES.
    //
    
    // Draw all the triangular facets.
    glBegin(GL_TRIANGLES,"Tetra",true);

    // The three vertices are +-+ ++- -++ ---

    // all but ---
    glColor3f(1.0,1.0,0.0);
    glVertex3f( 1.0,-1.0, 1.0);
    glVertex3f( 1.0, 1.0,-1.0);
    glVertex3f(-1.0, 1.0, 1.0);
    // all but ++-
    glColor3f(0.0,1.0,1.0);
    glVertex3f( 1.0,-1.0, 1.0);
    glVertex3f(-1.0, 1.0, 1.0);
    glVertex3f(-1.0,-1.0,-1.0);
    // all but -++
    glColor3f(1.0,0.0,1.0);
    glVertex3f(-1.0,-1.0,-1.0);
    glVertex3f( 1.0, 1.0,-1.0);
    glVertex3f( 1.0,-1.0, 1.0);
    // all but +-+
    glColor3f(1.0,1.0,1.0);
    glVertex3f( 1.0, 1.0,-1.0);
    glVertex3f(-1.0,-1.0,-1.0);
    glVertex3f(-1.0, 1.0, 1.0);

    glEnd();
}

function makeTriangle() {
    glBegin(GL_TRIANGLES,"Triangle",true);
    glColor3f(1.0, 0.0, 0.0)                    // pure red
    glVertex3f(-0.5, -Math.sqrt(3.0)/6.0, 0.0); // left
    glColor3f(0.0, 1.0, 0.0)                    // pure green
    glVertex3f( 0.5, -Math.sqrt(3.0)/6.0, 0.0); // right
    glColor3f(0.0, 0.0, 1.0)                    // pure blue
    glVertex3f( 0.0, -Math.sqrt(3.0)/3.0, 0.0); // top
    glEnd();    
}

function drawObject() {

    /*
     * Draw the object selected by the user.
     */
    if (showWhich == 0) {
        glBeginEnd("Triangle");
    }
    if (showWhich == 1) {
        glBeginEnd("Tetra");
    }
    if (showWhich == 2) {
        glBeginEnd("Cube");
    }
    if (showWhich == 3) {
        glBeginEnd("Cylinder");
    }
    //
    // Add other objects for the assignment here.
    //
    if (showWhich == 4){
        glBeginEnd("Sphere");
    }
    if (showWhich == 5){
        glBeginEnd("Torus");
    }
    if (showWhich == 6){
        glBeginEnd("Bowl");
    }
    if (showWhich == 7){
        glBeginEnd("Pasta");
    }
    
}

function drawScene() {
    /*
     * Issue GL calls to draw the scene.
     */

    // Clear the rendering information.
    glClearColor(0.2,0.2,0.3);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    glEnable(GL_DEPTH_TEST);

    // Clear the transformation stack.
    glMatrixMode(GL_MODELVIEW);
    glLoadIdentity();

    // Transform the object by a rotation.
    orientation.glRotatef();

    // Draw the object.
    glPushMatrix();
    glScalef(0.5,0.5,0.5);
    drawObject();
    glPopMatrix();
    
    // Render the scene.
    glFlush();

}

function handleKey(key, x, y) {
    /*
     * Handle a keypress.
     */

    //
    // Handle object selection.
    //
    if (key == '0') {
        showWhich = 0
    }

    if (key == '1') {
        showWhich = 1
    }
    //
    if (key == '2') {
        showWhich = 2
    }
    //
    if (key == '3') {
        showWhich = 3
    }
    //
    if (key == '4'){
        showWhich = 4
    }
    if (key == '5'){
        showWhich = 5
    }
    if (key == '6'){
        showWhich = 6
    }
    if (key == '7'){
        showWhich = 7
    }
    // if (key == '8'){
    //     showWhich = 8
    // }
    // if (key == '9'){
    //     showWhich = 9
    // }
    glutPostRedisplay();
}

function worldCoords(mousex, mousey) {
    /*
     * Compute the world/scene coordinates associated with
     * where the mouse was clicked.
     */

     const pj = mat4.create();
     glGetFloatv(GL_PROJECTION_MATRIX,pj);
     const pj_inv = mat4.create();
     mat4.invert(pj_inv,pj);
     const vp = [0,0,0,0];
     glGetIntegerv(GL_VIEWPORT,vp);
     const mousecoords = vec4.fromValues(2.0*mousex/vp[2]-1.0,
         1.0-2.0*mousey/vp[3],
         0.0, 1.0);
     vec4.transformMat4(location,mousecoords,pj_inv);
     return {x:location[0], y:location[1]};
 }    

 function handleMouseClick(button, state, x, y) {
    /*
     * Records the location of a mouse click in 
     * world/scene coordinates.
     */

    // Start tracking the mouse for trackball motion.
    mouseStart  = worldCoords(x,y);
    mouseButton = button;
    if (state == GLUT_DOWN) {
     mouseDrag = true;
 } else {
     mouseDrag = false;
 }
 glutPostRedisplay()
}

function handleMouseMotion(x, y) {
    /*
     * Reorients the object based on the movement of a mouse drag.
     *
     * Uses last and current location of mouse to compute a trackball
     * rotation. This gets stored in the quaternion orientation.
     *
     */

    // Capture mouse's position.
    mouseNow = worldCoords(x,y)

    // Update object/light orientation based on movement.
    dx = mouseNow.x - mouseStart.x;
    dy = mouseNow.y - mouseStart.y;
    axis = (new vector(-dy,dx,0.0)).unit()
    angle = Math.asin(Math.min(Math.sqrt(dx*dx+dy*dy),1.0))
    orientation = quatClass.for_rotation(angle,axis).times(orientation);

    // Ready state for next mouse move.
    mouseStart = mouseNow;

    // Update window.
    glutPostRedisplay()
}

function resizeWindow(w, h) {
    /*
     * Register a window resize by changing the viewport. 
     */
     glViewport(0, 0, w, h);
     glMatrixMode(GL_PROJECTION);
     glLoadIdentity();
     if (w > h) {
        glOrtho(-w/h, w/h, -1.0, 1.0, -1.0, 1.0);
    } else {
        glOrtho(-1.0, 1.0, -h/w * 1.0, h/w * 1.0, -1.0, 1.0);
    }
    glutPostRedisplay();
}


function main() {
    /*
     * The main procedure, sets up GL and GLUT.
     */

    // set up GL/UT, its canvas, and other components.
    glutInitDisplayMode(GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH);
    glutInitWindowPosition(0, 20);
    glutInitWindowSize(360, 360);
    glutCreateWindow('object showcase' )
    resizeWindow(360, 360); // It seems to need this.                                                                                                         

    // Build the renderable objects.
    makeTetra();
    makeCube();
    makeCylinder();
    makeTriangle();
    makeSphere();
    makeTorus();
    drawBowl();
    makePasta();
    // Register interaction callbacks.
    glutKeyboardFunc(handleKey);
    glutReshapeFunc(resizeWindow);
    glutDisplayFunc(drawScene);
    glutMouseFunc(handleMouseClick)
    glutMotionFunc(handleMouseMotion)

    // Go!
    glutMainLoop();

    return 0;
}

glRun(main,true);
