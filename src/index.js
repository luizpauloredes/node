const express = require('express');
const { uuid } = require('uuidv4');


const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * 
 * GET: Buscar informações do back-end
 * POST: Criar uma info no back-end
 * Put/Patch: Alterar uma informação no back-end
 * DELETE: quando for deltar uma info do back-end
 */

/**tipos de parametros
 * Query params: Filtros e paginação  * 
 * Route params: indentificar recuros (atualizar/deletar)
 * Request Body: Conteúdo na hora, criar ou editar um recurso(json)
 */
const projects = [];


app.get('/projects', (request, response) => {
  const { title } = request.query;
  
  const results = title 
  ? projects.filter( project => project.title.includes(title))
  : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = { id: uuid(), title, owner };

  projects.push(project);

  return response.json(project);
});


app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found' })
  }

  projects.splice(projectIndex, 1)

  return response.status(204).send();
});





app.listen(3333, () => {
  console.log('✔ Back-end started!')
});