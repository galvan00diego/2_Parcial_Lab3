<?php
require_once ("AccesoDatos.php");
require_once './vendor/autoload.php';

class Usuario 
{

        private $_id;
        private $_nombre;
        private $_apellido;
        private $_email;
        private $_foto;
        private $_username;
        private $_clave;
        


        public function GetId() {

            return $this->_id;
        }

        public function GetNombre() {
            
            return $this->_nombre;
        }

        public function GetApellido() {

            return $this->_apellido;
        }

        public function GetEmail() {
            
            return $this->_email;
        }

        public function GetFoto() {
            
            return $this->_foto;
        }

        public function GetUsername(){
            return $this->_username;
        }

        public function GetClave() {
            
            return $this->_clave;
        }

        public function __construct($id=NULL,$nombre,$apellido,$email,$foto, $clave) {

            $this->_id=$id;
            $this->_nombre = $nombre;
            $this->_apellido=$apellido;
            $this->_email=$email;
            $this->_foto = $foto;
            $this->_clave = $clave;
            
        }

        public static function ToJson($obj) {

            return '{"id":"'.$obj->GetId().'", "name":"'.$obj->GetNombre().'" ,"apellido": "'.$obj->GetApellido().'", "email":"'.$obj->GetEmail().'","foto":"'.$obj->GetFoto().',"username":"'.$obj->GetUsername().
                '","clave":"'.$obj->GetClave().'"}';
        }

        public static function Agregar($request , $response , $foto)
        {
            $parametros = $request->getParsedBody();
            $fotoFinal = date("Gis").".".pathinfo($foto["foto"]["name"] , PATHINFO_EXTENSION);
            $rutaFoto = "./img/".$fotoFinal;

            $empleado=new Usuario(NULL,$parametros["name"],$parametros["apellido"],$parametros["email"],$fotoFinal,$username["username"],$parametros["password"]);
           
            if(move_uploaded_file($foto["foto"]["tmp_name"] , $rutaFoto))
                $response->getBody()->write("La foto se cargo correctamente.");
            else
                $response->getBody()->write("Error al cargar la foto.");

            $conexion=AccesoDatos::DameUnObjetoAcceso();
            $resultados = $conexion->RetornarConsulta("INSERT INTO `usuarios`(`nombre`, `apellido`, `email`, `foto`,`username`, `clave`)VALUES ('".$empleado->GetNombre()."' , '".$empleado->GetApellido()."' ,'".$empleado->GetEmail()."' , '".$fotoFinal." ','".$empleado->getUsername()." ','".$empleado->GetClave()."')");
            if($resultados->execute())
            {    
                $response->getBody()->write("Se ha cargado correctamente el nuevo usuario.");
                return $response;
            }
            else
            {
                $response->getBody()->write("Error al cargar el usuario.");
                return $response;
            }
        }
}