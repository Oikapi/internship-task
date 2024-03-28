<?php

require_once __DIR__ . '/../Сontroller/ProductController.php';

class Api {
  private $productController;

    public function __construct(ProductController $productController)
    {
        $this->productController = $productController;
    }

    public function handleRequest()
    {
       
        $requestUri = $_SERVER['REQUEST_URI'];
        $method = $_SERVER['REQUEST_METHOD'];

       
        $uriParts = explode('/', $requestUri);
        $resource = $uriParts[1];
        $action = isset($uriParts[2]) ? $uriParts[2] : null;

       
        switch ($resource) {
            case 'products':
                if ($method === 'GET') {
                   
                    if ($action === 'getAll') {
                        echo json_encode($this->productController->getAll());
                    } 
                   
                    elseif ($action === 'get') {
                        $id = isset($uriParts[3]) ? $uriParts[3] : null;

                        if ($id !== null) {
                            echo json_encode($this->productController->get($id));
                        } else {
                            http_response_code(400);
                            echo json_encode(['error' => 'Missing product ID']);
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Invalid action']);
                    }
                } elseif ($method === 'POST') {
                   
                    $data = json_decode(file_get_contents('php://input'), true);
                    echo json_encode($this->productController->add($data));
                } elseif ($method === 'PUT') {
                   if ($action === 'edit') {
                        $id = isset($uriParts[3]) ? $uriParts[3] : null;
                        if ($id !== null) {
                            $data = json_decode(file_get_contents('php://input'), true);
                            echo json_encode($this->productController->edit($id, $data));
                        } else {
                            http_response_code(400);
                            echo json_encode(['error' => 'Missing product ID']);
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Invalid action']);
                    }
                } elseif ($method === 'DELETE') {
                    if ($action === 'delete') {
                        $id = isset($uriParts[3]) ? $uriParts[3] : null;
                        if ($id !== null) { 
                            echo json_encode($this->productController->delete($id));
                        } else {
                            http_response_code(400);
                            echo json_encode(['error' => 'Missing product ID']);
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(['error' => 'Invalid action']);
                    }
                } else {
                    http_response_code(404);
                    echo json_encode(['error' => 'Invalid method']);
                }
                break;
            default:
               
                http_response_code(404);
                echo json_encode(['error' => 'Not Found']);
                break;
        }
    }
}
