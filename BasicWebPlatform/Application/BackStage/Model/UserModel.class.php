<?php
namespace BackStage\Model;

class UserModel extends BaseModel {

	protected $trueTableName = 't_user';

	protected $fields = array(
		'id',
		'account',
		'password',
		'name',
		'available',
		'type_id',
		'create_time',
		'create_user_id',
		'last_login_time',
		'last_login_ip',

		'_pk' => 'id'
	);
}