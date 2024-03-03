
//Application to do CRUD operations using React with the help of Axios
// JSON data for one book is as follows: 
// {"id":2,"title":"Fire","author":"Bet"}
// The id is auto-incremented in the server
// The server is running at https://node41091-noderest.proen.app.ruk-com.cloud/

import BookList from './components/BookList';


export default function App() {
  return (
    <div>
      <h1>CRUD Operations</h1>
      <BookList />
    </div>
  );
}

