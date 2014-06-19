<?php

namespace User\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

class User{

	public function __construct($data = null) {

	}
	/**
	 * Id
	 * @var MongoId
	 *
	 * @ODM\Id
	 */

	protected $id;

	/**
	 * name
	 * @var String
	 *
	 * @ODM\String
	 */
	protected $name;

	/**
	 * Email
	 * @var String
	 *
	 * @ODM\String
	 */
	protected $email;

	/**
	 * Password
	 * @var String
	 *
	 * @ODM\String
	 */
	protected $password;

	/**
	 * Role (guest, user, admin)
	 * @var String
	 *
	 * @ODM\String
	 */
	protected $role;

	/**
	 * facebook
	 * @var String
	 *
	 * @ODM\String
	 */
	protected $facebook;

    /**
     * @return \Zend\Permissions\Acl\Role\RoleInterface[]
     */

	/** @ODM\EmbedMany(targetDocument="User\Document\User\Address") */

	/**
	 * Created Date
	 * @var DateTime
	 *
	 *  @ODM\Date
	 */
	protected $created_at;

	/**
	 * Updated Date
	 * @var DateTime
	 *
	 * @ODM\Date
	 */
	protected $updated_at;

	/**
	 * Last login date
	 * @var DateTime
	 *
	 * @ODM\Date
	 */
	protected $last_access;

	public function setName($name){
		$this->name = $name;
	}

	public function setEmail($email){
		$this->email = $email;
	}

	public function setPassword($password){
		$this->password = $password;
	}

	public function setRole($role){
		$this->role = $role;
	}

	/** ================================================================== **/

	/** @ODM\PrePersist */
	public function prePersist() {
		$this->created_at = new \DateTime();
	}

	/** @ODM\PreUpdate */
	public function preUpdate() {
		$this->updated_at = new \DateTime();
	}

	/** ================================================================== **/

	/**
	 * Overriding toArray method
	 */
	public function toArray($attributes = array(), $formatter = null) {
		$values = parent::toArray($attributes, $formatter);
		unset($values["password"]);

		return $values;
	}


	/**
	 * Check if the user is validated in the system on a method
	 * @var $method : "facebook" | "phone" | "email"
	 */
	public function isValidated($method) {
		if ($this->getValidation()) {
			if ($this->getValidation()->get($method)) {
				if ($this->getValidation()->get($method)->getStatus() == "verified") {
					return true;
				}
			}
		}
		return false;
	}

	/**
	 * Check if the user has the mandatory fields
	 *
	 */
	public function hasMandatoryFields() {
		$pass = true;

		if (!$this->getEmail()) {
			$pass = false;
		}
		if (!count($this->getPhonenumber())) {
			$pass = false;
		}
		return $pass;
	}

	public function prepareResult() {

	}

	public function toCsv($fields, $formatter = null) {
		$content = array();
		$values = $this->toArray(array("user" => $fields), $formatter);
		return arrayToCsv($values, $fields);
	}

	 public function getUrl() {
	 	return "/user/profile/public?user_id=".$this->id;
	 }

}