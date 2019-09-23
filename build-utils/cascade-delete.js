/**
 * Reusable cascade delete module
 * @param {string} ePath: event path from gulp.watch event
 * @param {stats} unknown
 * @param {string} deleteDest: folder where the file is going to be deleted resides
 * @param {string} taskName: output to console the task that is running the cascadeDelete function
 * @param {boolean} grabParentFolder: boolean flag if the immediate parent folder of the file needs to be obtained from ePath
 */
const path = require('path');
const del = require('delete');

function cascadeDelete (ePath, stats, deleteDest, taskName, grabParentFolder) {
  // code to execute on delete
  let fileName = path.basename(ePath);
  let pathPieces = ePath.split(path.sep);
  let parentFolder = '';
  if (grabParentFolder) {
    parentFolder = pathPieces[pathPieces.length - 2];
  }
  console.log(parentFolder);
  if(grabParentFolder) {
    // console.log(`${path.join(deleteDest,parentFolder, fileName)} path to be deleted`);
    del(path.join(deleteDest,parentFolder, fileName), {force: true}, function(err, deleted) {
      if (err) throw err;
      // deleted files
      console.log(`${deleted} deleted - ${taskName}`);
    });
  } else {
    // console.log(`${path.join(deleteDest, fileName)} path to be deleted`);
    del(path.join(deleteDest, fileName), {force: true}, function(err, deleted) {
      if (err) throw err;
      // deleted files
      console.log(`${deleted} deleted - ${taskName}`);
    });
  }
}

module.exports = cascadeDelete;
