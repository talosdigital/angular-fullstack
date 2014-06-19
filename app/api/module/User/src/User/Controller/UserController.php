<?php

namespace User\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;
use User\Document\User;

class UserController extends AbstractRestfulController{

  public function indexAction() {

    $dm = $this->getServiceLocator()->get('doctrine.documentmanager.odm_default');
    $user = new User();
    $user->setName('Javier De la Hoz');
    $user->setEmail('javierdlahoz@gmail.com');
    $user->setPassword('1234');
    $dm->persist($user);
    $dm->flush();

    return new JsonModel(array('gretting' => 'yei'));
  }

    public function init()
    {
        $this->_helper->viewRenderer->setNoRender(true);
    }

    //public function indexAction(){
   // }

    public function getAction()
    {
    }

    public function postAction()
    {
        $user = $this->user;
        $name = $this->getRequest()->{'name'};
        $email = $this->getRequest()->{'email'};
        $password = $this->getRequest()->{'password'};

        $user->setName($name);
        $user->setEmail($email);
        $user->setPassword($password);

        $user->save();
        return new JsonModel(array('gretting' => 'yei'));
    }

    public function putAction()
    {
    }

    public function deleteAction()
    {
    }

    function getRequest() {
        return json_decode(file_get_contents("php://input"));
    }
}