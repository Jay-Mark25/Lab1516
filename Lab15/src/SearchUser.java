import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class SearchUser {
    private final DatabaseConnection dbConnection;

    public SearchUser(DatabaseConnection dbConnection) {
        this.dbConnection = dbConnection;
    }

    public String searchById(int id) {
        StringBuilder sb = new StringBuilder();
        String selectQuery = "SELECT * FROM users WHERE id = ?";
        try (Connection con = dbConnection.getConnection();
             PreparedStatement selectStatement = con.prepareStatement(selectQuery)) {
            selectStatement.setInt(1, id);
            ResultSet rs = selectStatement.executeQuery();

            while (rs.next()) {
                String name = rs.getString("name");
                String email = rs.getString("email");
                sb.append("ID: ").append(id).append(", Name: ").append(name).append(", Email: ").append(email).append("\n");
            }

            if (sb.length() == 0) {
                sb.append("No record found with ID: ").append(id);
            }
        } catch (Exception e) {
            System.out.println(e);
        }
        return sb.toString();
    }
}