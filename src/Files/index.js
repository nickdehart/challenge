import React from 'react';

import { useFiles } from './use-files';
import { addVersion, addFile } from '../api';

import styles from './index.module.css';

// TODO: Improve the implementation of this component according to task (4)
function File({ file, setState }) {

  const onRename = () => {
    const newName = window.prompt('Rename this file');
    addVersion(file.id, newName);
    setState(Math.random());
  }
  let current = file.versions.reduce((prev, current) => (prev.id > current.id) ? prev : current)

  return (
    <div className={styles.file}>
      <strong>{current.name}</strong>
      <button onClick={onRename}>Rename</button>
      <ul>
        { file.versions.map(version => (
          <li key={version.id}>
            { version.name }
          </li>
        )) }
      </ul>
    </div>
  );
}

export default function Files() {
  // TODO: Replace this polling-like implementation according to task (2)
  const [ state, setState ] = React.useState();
  const [ order, setOrder ] = React.useState(true);
  const files = useFiles();

  const sort = () => {
    for (const file in files) {
      if (order)
        files[file].versions.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
      else
        files[file].versions.sort((a,b) => (a.name < b.name) ? 1 : ((b.name < a.name) ? -1 : 0));
      setOrder(!order)
    }
  }

  const submit = (e) => {
    e.preventDefault();
    if(e.target.filename.value)
      addFile(e.target.filename.value)
        .then(() => window.alert('Success!'))
        .then(() => setState(Math.random()))
        .catch((err) => console.log(err))
    else
      window.alert("No filename entered.")
  }

  return (
    <>
      {/* TODO: Implement sort feature according to task (3) */}
      <button onClick={sort}>Sort A-Z/Z-A</button>
      {
        files.map(file => <File file={file} key={file.id} setState={setState}/>)
      }
      {/* TODO: Add a button to add a new file according to task (5) */}
      <form onSubmit={submit}>
        <input type="text" id="filename"/>
        <br/>
        <button type="submit">Add File</button>
      </form>
    </>
  );
}
