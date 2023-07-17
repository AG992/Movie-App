/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movie_info').del()
  await knex('movie_info').insert([
    {id: 1, title: 'Inception', release_date: '2010-07-16'},
    {id: 2, title: 'Godfather I', release_date: '1972-03-24'},
    {id: 3, title: 'Godfather II', release_date: '1974-12-20'},
    {id: 4, title: 'Godfather III', release_date: '1990-12-25'},
    {id: 5, title: 'Despicable Me', release_date: '2010-07-09'},
    {id: 6, title: 'Minions', release_date: '2015-07-10'},
    {id: 7, title: 'The Lion King', release_date: '1994-06-15'},
  ]);
};
