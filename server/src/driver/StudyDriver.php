<?php
require_once __DIR__ . '/TypeDriver.php';

trait StudyDriver {
    use TypeDriver;

    /** 
     * Get a set of `Study`s matching the criteria parameters.
     */
    private static function _select(

        /** 
         * The `AdminID` column of the `Admin` table in the LAMP v0.1 DB.
         */
        $admin_id = null
    ) {
        $cond = $admin_id !== null ? "AND Admin.AdminID = '$admin_id'" : '';
        $results = self::lookup("
            SELECT 
                Admin.AdminID AS id, 
                ('Default Study') AS name, 
                (
                    SELECT 
                        StudyId AS id
                    FROM Users
                    WHERE isDeleted = 0 
                        AND Users.AdminID = Admin.AdminID
                    FOR JSON PATH, INCLUDE_NULL_VALUES
                ) AS participants,
                (
                    SELECT 
                        SurveyID AS id,
                        Admin.AdminID AS aid
                    FROM Survey
                    WHERE isDeleted = 0 
                        AND Survey.AdminID = Admin.AdminID
                    FOR JSON PATH, INCLUDE_NULL_VALUES
                ) AS surveys,
                (
                    SELECT 
                        ActivityIndexID AS id,
                        Admin.AdminID AS aid
                    FROM LAMP_Aux.dbo.ActivityIndex
                    WHERE ActivityIndexID > 1
                    FOR JSON PATH, INCLUDE_NULL_VALUES
                ) AS ctests
            FROM Admin
            LEFT JOIN Admin_Settings
                ON Admin_Settings.AdminID = Admin.AdminID
            WHERE isDeleted = 0 {$cond}
            FOR JSON PATH, INCLUDE_NULL_VALUES;
        ", 'json');
        if (count($results) == 0) return null;
        
        // Map from SQL DB to the local Study type.
        return array_map(function($raw) {
            $obj = new Study();
            $obj->id = new TypeID([Study::class, $raw->id]);
            $obj->name = $raw->name;
            $obj->participants = isset($raw->participants) ? array_map(function($x) { 
                return LAMP::decrypt($x->id, true); 
            }, $raw->participants) : [];
            $obj->activities = array_merge(
                isset($raw->surveys) ? array_map(function($x) { 
                    return new TypeID([Activity::class, 1 /* survey */, $x->aid, $x->id]);
                }, $raw->surveys) : [], 
                isset($raw->ctests) ? array_map(function($x) {
                    return new TypeID([Activity::class, $x->id, $x->aid, 0 /* SurveyID */]);
                }, $raw->ctests) : []
            );
            return $obj;
        }, $results);
    }

	/**
	 * Create a `Study` with a new object.
	 */
	private static function _insert(

		/**
		 * The new object.
		 */
		$insert_object
	) {
		// TODO: Studies do not exist! They cannot be modified!
		return null; // TODO
	}

	/**
	 * Update a `Study` with new fields.
	 */
	private static function _update(

		/**
		 * The `AdminID` column of the `Admin` table in the LAMP v0.1 DB.
		 */
		$admin_id,

		/**
		 * The replacement object or specific fields within.
		 */
		$update_object
	) {
		// TODO: Studies do not exist! They cannot be modified!
		return null; // TODO
	}

	/**
	 * Delete a `Study` row.
	 */
	private static function _delete(

		/**
		 * The `AdminID` column of the `Admin` table in the LAMP v0.1 DB.
		 */
		$admin_id
	) {
		// TODO: Studies do not exist! They cannot be modified!
		return null; // TODO
	}
}
