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
    connection = []
    try:
        # open the connection
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')
    except:
        raise Exception("Cannot open connection")


    try:
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
                
                return (value, state_as_list)

            raise Exception("Error with selecting from database")
    except:
        print("Error with selecting from database")
    finally:
        # close the connection after it is done
        connection.close()


# gets all the values of the state and the values for the list of states from the db
def get_hash_values_and_by_hash_codes(hash_codes, environment_id, envy_id):
    try:
        # print("HASH CODES RECIEVED", hash_codes)
        hash_codes_and_values = {}
        if len(hash_codes) == 0:
            return hash_codes_and_values

        recieved_codes = []

        # open the connecton
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')

        # connection is established
        with connection.cursor() as cursor:

            hash_code_string = ""
            for hash_code_index in range(len(hash_codes)):
                hash_code = hash_codes[hash_code_index]
                if hash_code_index == 0:
                    hash_code_string = hash_code_string + "'" + str(environment_id) + "_" + str(envy_id) + "_" + str(hash_code) + "'" 
                else:
                    hash_code_string = hash_code_string + "," + "'" + str(environment_id) + "_" + str(envy_id) + "_" + str(hash_code) + "'" 

            # get the state and the value for the state
            select_statement_for_value_and_state = "SELECT `Value`, `HashCode` FROM hashes WHERE HashCode in (" + hash_code_string + ") ORDER BY FIELD(HashCode," + hash_code_string + ")" 
            # execute the select statement
            cursor.execute(select_statement_for_value_and_state)
            connection.commit()

            rows = cursor.fetchall()

            code_index = 0

            # for each of the row
            for row in rows:
                # value found
                value = row[0]
                hash_codes_and_values[code_index] = value

                recieved_codes.append(row[1])

                code_index += 1

            connection.close()
                
            if len(hash_codes_and_values) != len(hash_codes):
                print("HEREHEHEHEHEHEHEE", hash_codes_and_values, hash_codes, len(hash_codes_and_values), len(hash_codes), recieved_codes)
                raise Exception("Error with selecting from database")
            
            return hash_codes_and_values
    except Exception:
        raise Exception
        

# finds the value of the ternary
def ternary(hash_code):
    if hash_code < 0:
        raise ValueError('Invalid value')
    if hash_code == 0:
        return ['0']
    nums = []
    while hash_code:
        hash_code, remainder = divmod(hash_code, 3)
        nums.insert(0, str(remainder))
    return nums


# pads the state with 0's if the state translated does not have the correct length
def fix_state_translated(state_translated):
    return (['0'] * (16 - len(state_translated))) + state_translated

# build update statement
def build_update(values_to_update_by_hash,mapID):
    values = ""
    for i in range(len(values_to_update_by_hash)):
        join_part = mapID + "_" + str(i)  + "_"
        for hash_code in values_to_update_by_hash[i]:
            state_translated = ternary(hash_code)
            if len(state_translated) < 16:
                state_translated = fix_state_translated(state_translated)
            state_translated = ''.join(state_translated)
            # values = values + "('" + join_part + str(hash_code) + "'," + "'" + values_to_update_by_hash[i][hash_code] + "'" + "," + state_translated + "),"
            # values = values + "('" + join_part + str(hash_code) + ",'" + str(values_to_update_by_hash[i][hash_code])  + "'," + state_translated + "'),"
            values = values + "('" + join_part + str(hash_code) + "','" + state_translated + "'," + str(values_to_update_by_hash[i][hash_code]) + "),"
    values = values[:-1]

    update_statement_for_hash_and_value = "INSERT INTO hashes (HashCode, State, Value) VALUES " + values + " ON DUPLICATE KEY UPDATE State=VALUES(State), Value=VALUES(Value);"
    return update_statement_for_hash_and_value


# puts all the values of the state with the hashes
def put_values(values_to_update_by_hash, mapID):
    # SELECT * FROM hashes WHERE HashCode LIKE '0_%_227205' AND WHERE State = '0000102112200000';
    # INSERT INTO hashes (HashCode, Value, State) VALUES ('0_0_227205',4084488000.5,'0000102112200000'), ('0_0_227205',4084488000.5,'0000102112200000')  ON DUPLICATE KEY UPDATE State=VALUES(State), Value=VALUES(Value);
    try:
        hash_codes_and_values = {}

        # open the connecton
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')

        # connection is established
        with connection.cursor() as cursor:
            update_statement_for_hash_and_value = build_update(values_to_update_by_hash,mapID)

            # INSERT INTO hashes (HashCode, Value) VALUES (0_8_5919480,0.14167968750000004) ON DUPLICATE KEY UPDATE HashCode=VALUES(HashCode), Value=VALUES(Value);

            print("UPDATE STATEMENT", update_statement_for_hash_and_value)

            # execute the select statement
            cursor.execute(update_statement_for_hash_and_value)
            connection.commit()
            print("Completed database update")

    except Exception as e:
        print("EXCEPTION", e)
    finally:
        # close the connection after it is done
        connection.close()


# check if the map already exists in the database before creating new values for that map with initial values
def check_map(map_id_to_check):
    try:
        # open the connecton
        connection = pymysql.connect('198.199.121.101', 'Richard', pwd, 'logic')

        # connection is established
        with connection.cursor() as cursor:
            select_statement = "SELECT DISTINCT LEFT(HashCode, 1) FROM hashes;"

            # execute the select statement
            cursor.execute(select_statement)
            connection.commit()

            rows = cursor.fetchall()

            code_index = 0

            # for each of the row
            for row in rows:
                # value found
                value = row[0]
                
                if str(map_id_to_check) == value:
                    connection.close()
                    return True

            connection.close()
            return False

    except Exception as e:
        print("EXCEPTION", e)
        


# check_map(0)



