import cors from 'cors';

// En desarrollo permitimos reflejar el origin para que las peticiones con
// credenciales funcionen correctamente (no usar origin: '*' con credentials)
export default cors({
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});
