/**
 * @class SceneNode
 * @desc A SceneNode is a node in the scene graph.
 * @property {MeshDrawer} meshDrawer - The MeshDrawer object to draw
 * @property {TRS} trs - The TRS object to transform the MeshDrawer
 * @property {SceneNode} parent - The parent node
 * @property {Array} children - The children nodes
 */

class SceneNode {
    constructor(meshDrawer, trs, parent = null) {
        this.meshDrawer = meshDrawer;
        this.trs = trs;
        this.parent = parent;
        this.children = [];

        if (parent) {
            this.parent.__addChild(this);
        }
    }

    __addChild(node) {
        this.children.push(node);
    }

    draw(mvp, modelView, normalMatrix, modelMatrix) {
        /**
         * @Task1 : Implement the draw function for the SceneNode class.
         */
        // Get the transformation matrix from TRS
        var transformationMatrix = this.trs.getTransformationMatrix();

        // Apply the transformation matrix to the MVP, ModelView, Normal, and Model matrices
        var transformedMvp = MatrixMult(mvp, transformationMatrix);
        var transformedModelView = MatrixMult(modelView, transformationMatrix);
        var transformedNormals = MatrixMult(normalMatrix, transformationMatrix); // Adjust as needed for normal matrix
        var transformedModel = MatrixMult(modelMatrix, transformationMatrix);

        // Draw the MeshDrawer for this node
        if (this.meshDrawer) {
            this.meshDrawer.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        }

        // Recursively draw child nodes with the updated matrices
        this.children.forEach(child => {
            child.draw(transformedMvp, transformedModelView, transformedNormals, transformedModel);
        });
    }

    

}