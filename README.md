# REToDo-List

Projeto de desafio - revisão.

Requisito funcional:
	Criação de um Todo-List com as seguintes funções:
	-Adicionar uma tarefa
		-Título, Descrição
	-Marcar tarefa como concluída
	-Categorizar tarefas
		-Fácil, Difícil, Urgente, Prioritária
	-Definir data de conclusão
	-Ordenar tarefas
 
Requisito não funcional:
	-Usar API Fake
	-Para o front desejável usar React ou Angular
	-Usar recursos RXJS
	-Usar Bootstrap, Material UI, ou AntDesign

# Resultados:

Projeto contém LandingPage desenvolvida com base no design do Figma (Utilizando HTML e CSS para fins revisionais, navegação (rotas) entre componentes com Angular).

Para a ToDoList utilizados os conceitos de angular básico e avançado, assim como algumas bibliotecas em específico:
- json-server
- toastr
- bootstrap
- reactiveforms
- métodos rest - httpclient
- recursos rxjs - observable
- validators
- pipes - externos (ngx-order-pipe)
- dataBinding, entre outros...

# Funcionamento da aplicação

Para executar a mesma devemos executar dois comandos:

json-server --watch tarefas.db.json (para executar o nosso fake back-end)

Após iniciar o serviço de back-end, apenas iniciamos a aplicação:

ng serve (: