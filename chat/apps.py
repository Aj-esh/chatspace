from django.apps import AppConfig
from django.conf import settings
from cassandra.cluster import Cluster
from cassandra.cqlengine import connection
from cassandra.cqlengine.management import sync_table
from .cassandra_model import ChatMessage, ChatRoom


class ChatConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "chat"

    def ready(self):
        try:
            contact_points = getattr(settings, "CASSANDRA_CONTACT_POINTS", ["127.0.0.1"])
            port = getattr(settings, "CASSANDRA_PORT", 9042)
            keyspace = getattr(settings, "CASSANDRA_KEYSPACE", "chatspace_ks")
            protocol_version = getattr(settings, "CASSANDRA_PROTOCOL_VERSION", 3)

            cluster = Cluster(contact_points, port=port, protocol_version=protocol_version)
            session = cluster.connect()

            session.execute(
                f"""
                CREATE KEYSPACE IF NOT EXISTS {keyspace}
                WITH REPLICATION = {{'class': 'SimpleStrategy', 'replication_factor': '1'}}
                """
            )

            # IMPORTANT: cqlengine default keyspace should be your app keyspace
            connection.setup(contact_points, keyspace, protocol_version=protocol_version)

            sync_table(ChatMessage)
            sync_table(ChatRoom)

            print("Cassandra keyspace and tables are set up.")
        except Exception as e:
            print(f"Error setting up Cassandra keyspace and tables: {e}")
            print("Make sure Cassandra is running and reachable (default 127.0.0.1:9042).")