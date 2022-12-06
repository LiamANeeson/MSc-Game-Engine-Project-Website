import styles from "./style.module.css";

const Search = ({ setSearch, disabled }) => {
	return (
		<input
			disabled={disabled}
			type="text"
			className={styles.search}
			placeholder="Search"
			onChange={({ currentTarget: input }) => setSearch(input.value)}
		/>
	);
};

export default Search;
