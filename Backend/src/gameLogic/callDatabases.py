import pymysql

# reads the information for the password
passwordFile = open("password.txt","r")
pwd = passwordFile.read() 

# sets the value for the hash after it has been found
def set_hash_value(hash_to_values_and_state, environment_id, envy_id):
    try:
        # open the connection
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')

        # connection is established
        with connection.cursor() as cursor:
            # insert the hash into the db
            insert_statement_for_hashes = "INSERT INTO `hashes` (`HashCode`, `State`, `Value`) VALUES "

            value_info = []
            # construct the different values for each of the states
            for hash_code in hash_to_values_and_state:
                (value, state) = hash_to_values_and_state[hash_code]

                # create the string version of the state
                state_string = "".join([str(i) for i in state])

                # primary key with combination of the code, environment id and the envy id
                primary_key = str(environment_id) + "_" + str(envy_id) + "_" + str(hash_code)
 
                value_tuple = "('{0}', '{1}', '{2}')".format(primary_key, state_string, value)
                value_info.append(value_tuple)

            # insert all the values in the database when it has values in the dictionary
            insert_statement_for_hashes = insert_statement_for_hashes + ",".join(value_info) + ";"

            # execute the insert statement to insert all values
            cursor.execute(insert_statement_for_hashes)
            connection.commit()
    except:
        print("Error with inserting into database")
    finally:
        # close the connection after it is done
        connection.close()


# gets the value of the state and the value for the state from the db
def get_hash_value_and_state_by_hash_code(hash_code, environment_id, envy_id):
    try:
        # open the connection
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')

        # connection is established
        with connection.cursor() as cursor:
            # select query for the db by the hash value
            primary_key = str(environment_id) + "_" + str(envy_id) + "_" + str(hash_code)

            # get the state and the value for the state
            select_statement_for_value_and_state = "SELECT `Value`, `State` FROM hashes WHERE HashCode = %s;"

            # execute the select statement
            cursor.execute(select_statement_for_value_and_state, primary_key)
            connection.commit()

            rows = cursor.fetchall()

            # for each of the row - but just need one
            for row in rows:
                # value found
                value = row[0]

                # state
                state = row[1]
                state_as_list = [int(i) for i in state]
                
                print("RETURNING", value, state_as_list)
                return (value, state_as_list)

            raise Exception("Error with selecting from database")
    except:
        print("Error with selecting from database")
    finally:
        # close the connection after it is done
        connection.close()

# get_hash_value_and_state_by_hash_code(17583507, 0, 0)



