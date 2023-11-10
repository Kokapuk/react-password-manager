import cn from 'classnames';
import { useEffect } from 'react';
import PasswordEditor from '../../components/PasswordEditor';
import PasswordList from '../../components/PasswordList';
import Search from '../../components/Search';
import useRedirect from '../../hooks/useRedirect';
import useEditorStore from '../../store/editor';
import usePasswordsStore from '../../store/passwords';
import styles from './Home.module.scss';

const Home = () => {
  const { selectedPassword, setSelectedPassword } = useEditorStore();
  const { passwords, isFetching: fetching, page, totalCount, query, fetch: fetchPasswords } = usePasswordsStore();
  useRedirect('authOnly');

  useEffect(() => {
    fetchPasswords(undefined, undefined, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={cn(styles.passwordList, !!selectedPassword && styles.editorOpen)}>
          <Search totalCount={totalCount} onQueryUpdate={fetchPasswords} />
          <PasswordList
            passwords={passwords}
            isFetching={fetching}
            query={query}
            selectedPasswordId={selectedPassword?._id}
            onPasswordSelect={setSelectedPassword}
            onPaginationTriggerReached={() => fetchPasswords(query, page + 1)}
          />
        </div>
        <div className={cn(styles.passwordEditorContainer, !selectedPassword && styles.editorNotOpen)}>
          {selectedPassword ? (
            <PasswordEditor key={selectedPassword._id} />
          ) : (
            <p className={styles.placeholder}>Select a password to view and edit it</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
